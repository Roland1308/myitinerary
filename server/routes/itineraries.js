const express = require("express");
const router = express.Router();
const itineraryModel = require("../model/itineraryModel");

/*get all itineraries*/
router.get("/all", (req, res) => {
    itineraryModel
      .find({})
      .then(files => {
        res.send(files);
      })
      .catch(err => console.log(err));
  });

/*add an Itinerary CREATE*/
router.post("/add", (req, res) => {
      const newItinerary = new itineraryModel({
        name: req.body.name,
        city: req.body.city,
        city_id: req.body.city_id,
        country: req.body.country,
        username: req.body.username,
        photo: req.body.photo,
        rating: req.body.rating,
        duration: req.body.duration,
        price: req.body.price,
        hashtags: req.body.hashtags
      });
      console.log("Itinerario ricevuto", req.body);
      newItinerary.save().then(itinerary => {
          res.send(itinerary);
        }).catch(err => {
          console.log("ERRORE ITINERARIO");
          res.status(500).send(err);
        });
      });

/*get Itineraries for a city READ*/
router.get("/:id", (req, res) => {
  itineraryModel
    .find({ city_id: req.params.id })
    .then(files => {
      res.send(files);
    })
    .catch(err => console.log(err));
});

/*get one itinerary by id and POPULATE activities READ*/
router.get("/populate/:id", (req, res) => {
  itineraryModel
    .findOne({ _id: req.params.id })
    .populate("activities", "name photo")
    .exec(function (err, itinerary) {
      if (err) {
        console.log("errore", err,"Itinerario", itinerary)
        return
      }
      res.send(itinerary);
      return
    })
});

module.exports = router;