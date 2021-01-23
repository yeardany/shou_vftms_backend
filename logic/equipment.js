let equipmentController = require('../controllers/equipment_controller');
let schedule = require('node-schedule');
let axios = require('axios')

let LocationCompute = require('../utils/locationCompute')

let logic = {

    endpoint: null,
    socket: null,

    broadcast: function (endpoint, socket) {

        this.endpoint = endpoint;
        this.socket = socket;

        socket.send('hello client')

        socket.on("disconnect", function () {

            console.log("a user go out");

        })
    },

    findEquipments: (req, res, next, aId) => {

        let obj = {}

        if (aId === '')
            res.send([]).end();
        else
            obj = {aId: aId}

        equipmentController.findEquipments(req, res, next, obj).then((r) => {

            console.log(new Date, 'findEquipmentsSuccess')
            res.send(r).end()

        }).catch((error) => {

            console.log(new Date, 'findAllEquipmentsError', error.message)
            res.send(error.message).end();

        });
    },

    findEquipmentById: (req, res, next, pushID, id) => {

        equipmentController.findEquipmentById(req, res, next, pushID, id).then((r) => {

            if (logic.distanceJudge(r))
                logic.pushToOne(pushID)

            return r

        }).then((r) => {

            console.log(new Date, 'findEquipmentByIdSuccess')
            res.send(r).end()

        }).catch((error) => {

            console.log(new Date, 'findEquipmentByIdError', error.message)
            res.send(error.message).end();

        });
    },

    updateEquipmentDataById: (req, res, next, id, setObj, pushObj) => {

        if (setObj === undefined || id === undefined) return

        equipmentController.updateEquipmentCoordinateById(req, res, next, setObj, pushObj, id).then((r) => {

            // TODO 超出范围推送（全员广播有限制）
            if (r['oLocation'] && r['pLocation'] && r['dist']) {
                // if (logic.distanceJudge({"oLocation": r['oLocation'], "pLocation": r['pLocation'], "dist": r['dist']}))
                //     logic.pushToAll()

                // 更新数据后广播数据
                if (logic.socket !== null)
                    logic.socket.emit('message', r)
            }

            if (res !== undefined)
                res.send(r).end()
            else
                console.log(new Date, 'updateEquipmentDataByIdSuccess')

        }).catch((error) => {

            if (res !== undefined)
                res.send(error.message).end();
            else
                console.log(new Date, 'updateEquipmentDataByIdError', error.message)

        });
    },

    insertManyEquipment: (req, res, next, setData) => {

        equipmentController.insertManyEquipment(req, res, next, setData).then((r) => {

            let eqNameID = {}

            if (r !== [] && r !== undefined) {

                r.forEach(i => {
                    eqNameID[i.eName] = i._id
                })

                temp.tempEquipUpdate(eqNameID)
            }

            console.log(new Date, 'insertManyEquipmentSuccess', r)

        }).catch((error) => {

            console.log(new Date, 'insertManyEquipmentError', error.message)

        });
    },

    deleteEquipmentByName: (req, res, next, eqNameArray) => {

        return equipmentController.deleteEquipmentByName(req, res, next, eqNameArray).then((r) => {

            console.log(new Date, 'deleteEquipmentByNameSuccess', r)
            return true

        }).catch((error) => {

            console.log(new Date, 'deleteEquipmentByNameError', error.message)
            return false

        });
    },

    distanceJudge: (r) => {

        if (r === undefined || r['oLocation'] === undefined || r['pLocation'] === undefined || r['dist'] === undefined) return

        let
            x0 = r['oLocation'][0] * 1,
            y0 = r['oLocation'][1] * 1,
            x = r['pLocation'][0] * 1,
            y = r['pLocation'][1] * 1,
            d = r['dist'],
            dist = new LocationCompute(x0, y0, x, y, 6371.14).getDistance(x0, y0, x, y)

        return dist > d
    },

    pushToOne: function (pushID) {

        if (pushID === undefined || pushID === '') return

        equipmentController.pushToOne(pushID).then((r) => {

            console.log('pushToOneSuccess', r);

        }).catch((err) => {

            console.log('pushToOneFail', err.message);

        })
    },

    pushToAll: function () {

        equipmentController.pushToAll().then((r) => {

            console.log('pushToAllSuccess', r);

        }).catch((err) => {

            console.log('pushToAllFail', err.message)

        })
    }
}

let temp = {

    setData: [],
    getData: () => {

        return axios.get('http://139.129.229.169:8080/fpms/api.do', {
            'params': {
                'method': 'getLastGps'
            }
        })
    },

    tempEquipInit: () => {

        temp.getData().then((r) => {

            if (r.data['DataList'] === [] || r.data['DataList'] === undefined)
                temp.setData = [{
                    'eName': '无数据插入',
                    'oLocation': [0, 0],
                    'pLocation': [0, 0],
                    'dist': 1,
                    'aId': 'zzd',
                    'lHistory': []
                }]
            else
                r.data['DataList'].forEach(i => {

                    if (i['Name'].indexOf("永丰") === -1) {

                        let
                            lat = i['Lat'] * 1,
                            lon = i['Lon'] * 1;

                        // 拉取的数据有误，此处转换，如后续没有问题，将下两行代码注释
                        lat = (Math.floor(lat) + (lat - Math.floor(lat)).toFixed(4) * 100 / 60).toFixed(3);
                        lon = (Math.floor(lon) + (lon - Math.floor(lon)).toFixed(4) * 100 / 60).toFixed(3);

                        temp.setData.push({
                            'eName': i['Name'],
                            'oLocation': [lat * 1, lon * 1],
                            'pLocation': [lat * 1, lon * 1],
                            'dist': 1,
                            'aId': 'zzd',
                            'upLoadTime': i['Time'],
                            'lHistory': [{"time": new Date().getTime(), "data": [lat * 1, lon * 1]}]
                        })
                    }

                })

            return new Promise((resolve, reject) => {
                let r = logic.deleteEquipmentByName(undefined, undefined, undefined, ['gps1', 'gps2'])

                if (r)
                    resolve(r)
                else
                    reject(r)
            })

        }).then((r) => {

            console.log('state', r)
            logic.insertManyEquipment(undefined, undefined, undefined, temp.setData)

        }, (r) => {

        }).catch((err) => {

            console.log('tempEquipInitError', err)

        })

    },

    tempEquipUpdate: (x) => {

        let rule = new schedule.RecurrenceRule()
        rule.minute = [0, 20, 40]

        schedule.scheduleJob('0 58 23 * * *', function () {
            temp.updateLogic(x, true)
        });

        schedule.scheduleJob(rule, function () {
            temp.updateLogic(x, false)
        });

    },

    updateLogic: (x, clear) => {

        temp.getData().then((r) => {

            if (r.data['DataList'] === [] || r.data['DataList'] === undefined) return

            r.data['DataList'].forEach(i => {

                if (i['Name'].indexOf("永丰") === -1) {

                    let
                        lat = i['Lat'] * 1,
                        lon = i['Lon'] * 1,
                        upLoadTime = i['Time'];

                    // 拉取的数据有误，此处转换，如后续没有问题，将下两行代码注释
                    lat = (Math.floor(lat) + (lat - Math.floor(lat)).toFixed(4) * 100 / 60).toFixed(3);
                    lon = (Math.floor(lon) + (lon - Math.floor(lon)).toFixed(4) * 100 / 60).toFixed(3);

                    if (x !== undefined && x !== {} && x[i.Name] !== undefined)

                        if (clear)
                            logic.updateEquipmentDataById(undefined, undefined, undefined, x[i.Name],
                                {
                                    "pLocation": [lat * 1, lon * 1],
                                    "oLocation": [lat * 1, lon * 1],
                                    "upLoadTime": upLoadTime,
                                    "lHistory": []
                                }, {}
                            )
                        else
                            logic.updateEquipmentDataById(undefined, undefined, undefined, x[i.Name],
                                {"pLocation": [lat * 1, lon * 1], "upLoadTime": upLoadTime},
                                {"lHistory": [{"time": new Date().getTime(), "data": [lat * 1, lon * 1]}]},
                            )

                }
            })

        }).catch((err) => {

            console.log('eq_logic_line_269', err)

        })

    }
}

temp.tempEquipInit()
module.exports = logic
