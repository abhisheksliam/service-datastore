import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Template Schema
 */
const TemplateSchema = new mongoose.Schema({
  "uuid": String,
  "name": String,
  "meta": {},
  "publish": {},
  "items": []
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
TemplateSchema.method({
});

/**
 * Statics
 */
TemplateSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of template.
   * @returns {Promise<User, APIError>}
   */
  get(_q) {
    return this.findOne(_q)
      .exec()
      .then((template) => {
        if (template) {
          return template;
        }
        const err = new APIError('No such template exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List template in descending order of 'createdAt' timestamp.
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
 * @typedef Template
 */
export default mongoose.model('Template', TemplateSchema, 'templates');
