var config = require('../config/database');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.database, { native_parser: true });

db.bind('packages');
var service = {};
service.getAll = getAll;
service.create = create;
service.update = update;
service.delete = _delete;
module.exports = service;

function getAll() {
    var deferred = Q.defer();
    db.packages.find().toArray(function (err, packages) {
        if (err) deferred.reject(err.name + ': ' + err.message);
        packages = _.map(packages, function (package) {
            return package;
        });
        deferred.resolve(packages);
    });
    return deferred.promise;
}

function update(_id, packageParam) {
    var deferred = Q.defer();
    var set = {
        _id: packageParam._id,
        _userId: packageParam._userId,
        addressline1: packageParam.addressline1,
        addressline2: packageParam.addressline2,
        city: packageParam.city,
        postalcode: packageParam.postalcode,
        country: packageParam.country,
        nameRec: packageParam.nameRec,
        addressline1Rec: packageParam.addressline1Rec,
        addressline2Rec: packageParam.addressline2Rec,
        cityRec: packageParam.cityRec,
        postalcodeRec: packageParam.postalcodeRec,
        countryRec: packageParam.countryRec,
        weight: packageParam.weight,
        status: packageParam.status
    };
    db.orders.update(
        { _id: mongo.helper.toObjectID(_id) },
        { $set: set },
        function (err, doc) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            deferred.resolve();
        });
    return deferred.promise;
}

function create(packageParam) {
    var deferred = Q.defer();
    // validation
    db.packages.findOne({ _id: packageParam._id },
        function (err, package) {
            if (err) deferred.reject(err.name + ': ' + err.message);
 
            if (package) {
                // package already exists
                deferred.reject('package "' + packageParam._id + '" already exsist');
            } else {
                createPackage();
            }
        });
 
    function createPackage() {
        var package = packageParam;
        db.packages.insert(
            package,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);
                deferred.resolve();
            });
    }
    return deferred.promise;
}
function _delete(_id) {
    var deferred = Q.defer();

    db.packages.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}