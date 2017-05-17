import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Mapper Schema
 */
const LocatorSchema = new mongoose.Schema({
  "app_type": String,
  "xpath": {
    "key": String,
    "value": String
  },
  "tags": []
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
LocatorSchema.method({


});

/**
 * Statics
 */
LocatorSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of locator.
   * @returns {Promise<User, APIError>}
   */
  get(_q) {
    return this.find(_q)
      .exec()
      .then((locator) => {
        if (locator) {
          return locator;
        }
        const err = new APIError('No such locator exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List locator in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Locator
 */
export default mongoose.model('Locator', LocatorSchema, 'locators');
