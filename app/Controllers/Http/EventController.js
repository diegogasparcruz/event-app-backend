'use strict'

const Event = use('App/Models/Event')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with events
 */
class EventController {

  async index ({ auth, response }) {

    try {
      const userID = auth.user.id

      const events =  await Event.query()
        .where({
          user_id: userID
        })
        .orderBy('date', "asc")
        .fetch()

      if(!events){
        return response.status(400).send({ message: { error:  'erro'  } })
      }

      return events

    } catch (error) {
      return response.status(error.status)
    }

  }

  async store ({ auth, request, response }) {

    try {

      const { title, location, date, time } = request.all()
      const userID = auth.user.id

      const newEvent = await Event.create({ user_id: userID, title, location, date, time })

      return newEvent

    } catch (err) {
      return response.status(err.status).send({ message: { error: 'Something went wrong while creating new event' } })
    }

  }

  async show ({ params, request, response, view }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ auth, params, response }) {

    try {

      const userID = auth.user.id;

      await Event.query()
        .where({
          id: params.id,
          user_id: userID
        }).delete()

    } catch (error) {
      return response.status(error.status)
    }

  }
}

module.exports = EventController
