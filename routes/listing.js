

const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validatelisting } = require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js")
const upload = multer({ storage })


const listingController = require("../controllers/listing.js");

// INDEX ROUTE  AND   // CREATE ROUTE
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validatelisting,
    wrapAsync(listingController.createListing)
  );
  
// NEW ROUTE...
router.get("/new", isLoggedIn, listingController.renderNewForm); // NEW route is written before /:id route because
// if it is written after /:id it will start searching for id in database




router
  .route("/:id")
  .get(wrapAsync(listingController.showlisting))
  .put(
    isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validatelisting,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// UPDATE ROUTE...
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderUpdateForm)
);

module.exports = router;
