const Listing = require("../models/listing.js")
const Review = require("../models/review.js")




module.exports.AddReviews = async (req, res) => {

    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    console.log("reviews was saved");
    req.flash("success", "New Review is Created!");
    res.redirect(`/listings/${listing._id}`);

  };


  

module.exports.deleteReviews = async (req, res) => {
    let { id, reviewID } = req.params;

    await Listing.findByIdAndUpdate(id , {$pull : {reviews:reviewID}})
    await Review.findByIdAndDelete(reviewID);
    
    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`)

  };