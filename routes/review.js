const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const { AddReviews , deleteReviews } = require("../controllers/review.js");




//REVIEWS....................

// POST REVIEWS ROUTE..


router.post(
    "/",
    isLoggedIn,
    validateReview,
    wrapAsync(AddReviews)
  );





  // DELETE REVIEWS ROUTE...........
router.delete(
    "/:reviewID",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(deleteReviews)
  );

  

  module.exports = router;

