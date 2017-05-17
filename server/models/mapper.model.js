import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Mapper Schema
 */
const MapperSchema = new mongoose.Schema({
  "template_id": String,
  "parameters": []
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
MapperSchema.method({


});

/**
 * Statics
 */
MapperSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of mapper.
   * @returns {Promise<User, APIError>}
   */
  get(_q) {
    return this.find(_q)
      .exec()
      .then((mapper) => {
        if (mapper) {
          return mapper;
        }
        const err = new APIError('No such mapper exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List mapper in descending order of 'createdAt' timestamp.
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
 * @typedef Mapper
 */
export default mongoose.model('Mapper', MapperSchema, 'mappers');
