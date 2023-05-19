const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
            // .lean()
            .then((courses) =>
                res.render("home", {
                    courses: multipleMongooseToObject(courses),
                    // courses
                })
            )
            .catch(next);
    }

    // [GET] /search
    search(req, res) {
        res.send("News details");
    }
}

module.exports = new SiteController();
