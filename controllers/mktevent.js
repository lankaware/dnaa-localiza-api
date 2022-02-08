const mongoose = require('mongoose')
const tokenok = require("../config/tokenValidate.js")
require("../models/MktEvent.js")
require("../models/EventLocation.js")

const EventLocationModelName = mongoose.model("EventLocation")
const eventLocationRouteName = "/eventlocation"


const ModelName = mongoose.model("MktEvent")
const routeName = "/mktevent"

module.exports = app => {

    app.get(routeName, tokenok, async (req, res) => {
        await ModelName.find()
            .sort('name')
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "name/:name", tokenok, async (req, res) => {
        let searchParm = { '$and': [{ 'name': { '$gte': req.params.name } }, { 'name': { '$lte': req.params.name + '~' } }] }
        await ModelName.find(searchParm)
            .select('_id name')
            .sort('name')
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "id/:id", async (req, res) => {
        const _id = mongoose.Types.ObjectId(req.params.id)
        await ModelName.findById(req.params.id)
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "perproject/:project", async (req, res) => {
        const project = mongoose.Types.ObjectId(req.params.project)
        await ModelName.find({ "reproject_id": project }, '_id name reproject_id date')
            .then((record) => {
                return res.json({
                    error: false,
                    record
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.get(routeName + "previous/:project", async (req, res) => {
        const LocationsArray = [];
        // const uniqueLocationsArray = [];
        const project = mongoose.Types.ObjectId(req.params.project)
        await ModelName.find({ "reproject_id": project }, '_id')
            .then(async (mkteventList) => {
                for (const el of mkteventList) {
                    await EventLocationModelName.find({ "event_id": el._id })
                        .then((eventLocationList) => {
                            for (const location of eventLocationList) {
                                if (!LocationsArray.includes(el.location_id))
                                    LocationsArray.push(location.location_id.toString())
                            }
                        })
                }
                // return uniqueLocationsArray = LocationsArray.filter((item, pos) => {
                //     return LocationsArray.indexOf(item) === pos;
                // })
                // console.log("uniqueLocationsArray", uniqueLocationsArray)
                return LocationsArray
            }).then((LocationsArray) => {
                return LocationsArray.filter((item, pos) => {
                    console.log(mongoose.Types.ObjectId(item))
                    console.log(LocationsArray.indexOf(item))
                    return LocationsArray.indexOf(item) === pos;
                })
            })
            .then((record) => {
                return res.json({
                    error: false,
                    record: record
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })


    app.post(routeName, tokenok, async (req, res) => {
        await ModelName.create(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.put(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.updateOne({ _id: req.params.id }, req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })

    app.put(routeName, tokenok, async (req, res) => {
        await ModelName.find(req.body)
            .then((record) => {
                return res.json({
                    error: false,
                    record,
                })
            }).catch((err) => {
                return res.json({
                    error: true,
                    message: err
                })
            })
    })

    app.delete(routeName + "id/:id", tokenok, async (req, res) => {
        await ModelName.deleteOne({ _id: req.params.id })
            .then(_ => {
                return res.json({
                    error: false,
                    message: "Registro removido.",
                })
            })
            .catch((err) => {
                return res.json({
                    error: true,
                    message: err,
                })
            })
    })
}


// app.get(routeName + "previous/:project/:event", async (req, res) => {
//     const LocationsArray = [];
//     const uniqueLocationsArray = [];
//     const filteredArray = [];
//     const project = mongoose.Types.ObjectId(req.params.project)
//     await ModelName.find({ "reproject_id": project }, '_id')
//         .then(async (mkteventList) => {
//             for (const el of mkteventList) {
//                 console.log("el", el)
//                 await EventLocationModelName.aggregate([
//                     {
//                         $lookup:
//                         {
//                             from: 'locations',
//                             localField: 'location_id',
//                             foreignField: '_id',
//                             as: 'location'
//                         }
//                     },
//                     {
//                         $match: { 'event_id': el._id }
//                     },
//                     {
//                         $project:
//                         {
//                             _id: 1,
//                             event_id: 1,
//                             location_id: 1,
//                             location_profile: '$location.profile',
//                             location_name: '$location.name',
//                             location_address: '$location.address',
//                             location_zip: '$location.zip',
//                             location_city: '$location.city',
//                             distance: 1,
//                             disponibility: 1,
//                             selected: 1,
//                         }
//                     },
//                     {
//                         $sort: { 'date': 1 },
//                     }
//                 ]).then((location) => {
//                     uniqueLocationsArray.push(location)
//                 })
//             }
//             uniqueLocationsArray.forEach((el) => {
//                 if(!filteredArray.includes(el.location_id))
//                     filteredArray.push(el.location_id)
//             })


//             return uniqueLocationsArray.forEach()
//         }).then((uniqueLocationsArray) => {
//             return res.json({
//                 error: false,
//                 record: uniqueLocationsArray
//             })
//         })
//         .catch((err) => {
//             return res.json({
//                 error: true,
//                 message: err
//             })
//         })
// })
