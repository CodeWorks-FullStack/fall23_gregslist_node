import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"

class CarsService {



  async getCars() {
    // NOTE find is a mongoose method that will return everything from a collection if no argument is provided, it is not the same as js find arrary method
    const cars = await dbContext.Cars.find()
    return cars
  }

  async getCarById(carId) {
    // NOTE finds a document by it's _id the specified collection. Must be an object Id or will throw an error
    const car = await dbContext.Cars.findById(carId)

    // if(car == undefined){}
    if (!car) {
      throw new BadRequest(`${carId} is not a valid Id`)
    }

    return car
  }

  async createCar(carData) {
    // NOTE turns our POJO into a car using the schema attached to this collection as specified in dbContext, and returns it back to us
    const car = await dbContext.Cars.create(carData)
    return car
  }

  async destroyCar(carId, userId) {
    // NOTE works, but it is bad
    // await dbContext.Cars.findByIdAndRemove(carId)

    // const carToBeDestroyed = await dbContext.Cars.findById(carId)
    const carToBeDestroyed = await this.getCarById(carId)

    if (carToBeDestroyed.creatorId.toString() != userId) {
      throw new Forbidden("NOT YOUR CAR TO DESTROY")
    }

    await carToBeDestroyed.remove()
    return carToBeDestroyed
  }

  async updateCar(carId, userId, carData) {
    const carToBeUpdated = await this.getCarById(carId)
    // await dbContext.Cars.findByIdAndUpdate(carId, carData)

    if (carToBeUpdated.creatorId.toString() != userId) {
      throw new Forbidden("NOT YOUR CAR TO UPDATE")
    }


    carToBeUpdated.make = carData.make || carToBeUpdated.make
    carToBeUpdated.model = carData.model || carToBeUpdated.model
    carToBeUpdated.price = carData.price != undefined ? carData.price : carToBeUpdated.price
    carToBeUpdated.runs = carData.runs != undefined ? carData.runs : carToBeUpdated.runs


    await carToBeUpdated.save()

    return carToBeUpdated
  }

}

export const carsService = new CarsService()