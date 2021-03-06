module.exports = {

    getModuleSet: (req, res, next, uRole, aId) => {

        if (uRole === '' || aId === '')

            res.send([]).end();

        else if (aId === 'sgw') {
            if (uRole === 'admin') {

                res.send({
                    home: [
                        {id: 1, icon: "video-o", to: "/home/camera/fishery", des: "在线视频"},
                        {id: 2, icon: "fire-o", to: "/home/environment", des: "水质环境"},
                        {id: 3, icon: "notes-o", to: "/home/inspect", des: "生长巡检"},
                        {id: 4, icon: "flower-o", to: "/home/weather", des: "基地气象"}
                    ],
                    camera: [
                        {title: '养殖监测点监控', to: 'fishery'},
                        {title: '区域监控', to: 'island'},
                        {title: '海上设备监控', to: 'equipment'}
                    ],
                    environmentDetail: [
                        {title: '溶解氧', to: 'enO2'},
                        {title: 'PH值', to: 'enPH'},
                        {title: '水温', to: 'enTem'},
                        {title: '营养盐', to: 'enNut'},
                        {title: '透明度', to: 'enTsc'},
                        {title: '历史', to: 'chartTest'}
                    ]
                }).end()

            } else if (uRole === 'user') {

                res.send({
                    home: [
                        {id: 2, icon: "fire-o", to: "/home/environment", des: "水质环境"},
                        {id: 1, icon: "video-o", to: "/home/camera/fishery", des: "在线视频"},
                        {id: 3, icon: "notes-o", to: "/home/inspect", des: "生长巡检"},
                        {id: 4, icon: "flower-o", to: "/home/weather", des: "基地气象"}
                    ],
                    camera: [
                        {title: '养殖监测点监控', to: 'fishery'},
                        {title: '海上设备监控', to: 'equipment'}
                    ],
                    environmentDetail: [
                        {title: 'PH值', to: 'enPH'},
                        {title: '溶解氧', to: 'enO2'},
                        {title: '水温', to: 'enTem'}
                    ]

                }).end()

            }
        } else if (aId === 'zzd') {
            if (uRole === 'admin') {

                res.send({
                    home: [
                        {id: 1, icon: "video-o", to: "/home/camera/equipment", des: "在线视频"},
                        {id: 2, icon: "fire-o", to: "/home/environment", des: "水质环境"},
                        {id: 3, icon: "notes-o", to: "/home/inspect", des: "生长巡检"},
                        {id: 4, icon: "flower-o", to: "/home/weather", des: "基地气象"}
                    ],
                    camera: [
                        {title: '海上设备监控', to: 'equipment'},
                        {title: '养殖监测点监控', to: 'fishery'}
                    ],
                    environmentDetail: [
                        {title: '溶解氧', to: 'enO2'},
                        {title: 'PH值', to: 'enPH'},
                        {title: '水温', to: 'enTem'},
                        {title: '营养盐', to: 'enNut'},
                        {title: '透明度', to: 'enTsc'},
                        {title: '历史', to: 'chartTest'}
                    ]
                }).end()

            } else if (uRole === 'user') {

                res.send({
                    home: [
                        {id: 2, icon: "fire-o", to: "/home/environment", des: "水质环境"},
                        {id: 3, icon: "notes-o", to: "/home/inspect", des: "生长巡检"}
                    ],
                    camera: [],
                    environmentDetail: [
                        {title: 'PH值', to: 'enPH'},
                        {title: '溶解氧', to: 'enO2'},
                        {title: '水温', to: 'enTem'}
                    ]

                }).end()

            }
        }
    }
}

