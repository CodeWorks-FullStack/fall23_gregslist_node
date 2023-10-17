import { Auth0Provider } from "@bcwdev/auth0provider";
import { carsService } from "../services/CarsService.js";
import BaseController from "../utils/BaseController.js";

export class CarsController extends BaseController {
  constructor () {
    super('api/cars')
    this.router
      // SECTION no auth required
      .get('', this.getCars)
      .get('/:carId', this.getCarById)
      // !SECTION


      .use(Auth0Provider.getAuthorizedUserInfo)
      // SECTION auth required
      .post('', this.createCar)
      .delete('/:carId', this.destroyCar)
      .put('/:carId', this.updateCar)
    // !SECTION
  }

  async getCars(request, response, next) {
    try {
      const cars = await carsService.getCars()
      return response.send(cars)
    } catch (error) {
      next(error)
    }
  }

  async getCarById(request, response, next) {
    try {
      const carId = request.params.carId
      const car = await carsService.getCarById(carId)
      return response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async createCar(request, response, next) {
    try {
      const carData = request.body
      // NOTE pulls userinfo object from bearer token
      const userInfo = request.userInfo
      // REVIEW NEVER TRUST THE CLIENT
      carData.creatorId = userInfo.id
      const car = await carsService.createCar(carData)
      return response.send(car)
    } catch (error) {
      next(error)
    }
  }

  async destroyCar(request, response, next) {
    try {
      const carId = request.params.carId
      const userId = request.userInfo.id
      // await carsService.destroyCar(carId, userId)
      const car = await carsService.destroyCar(carId, userId)

      return response.send(`The ${car.make} ${car.model} has been destroyed!`)
    } catch (error) {
      next(error)
    }
  }

  async updateCar(request, response, next) {
    try {
      const carId = request.params.carId
      const userId = request.userInfo.id
      const carData = request.body

      const updatedCar = await carsService.updateCar(carId, userId, carData)
      return response.send(updatedCar)
    } catch (error) {
      next(error)
    }
  }
}