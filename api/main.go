package main

import (
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/google/uuid"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {

	app := fiber.New()

	//connect database
	db, err := gorm.Open(postgres.Open("host=ep-red-breeze-ac1rxwdc-pooler.sa-east-1.aws.neon.tech user=fume_artes_db_owner password=npg_qOzsu8tmTa4r dbname=fume_artes_db port=5432 sslmode=require"), &gorm.Config{})

	if err != nil {
		println("Can't connect database")
	}

	app.Get("/customers", func(c *fiber.Ctx) error {

		//var method string = c.Method()
		var customers []Customer

		db.Find(&customers)

		return c.JSON(customers)
	})

	app.Get("/users", func(c *fiber.Ctx) error {

		var users []User

		db.Find(&users)

		return c.JSON(users)
	})

	app.Get("/orders", func(c *fiber.Ctx) error {
		var orders []Order

		db.Find(&orders)

		return c.JSON(orders)
	})

	app.Get("/pending_services", func(c *fiber.Ctx) error {
		var pending_service []PendingService

		db.Find(&pending_service)

		return c.JSON(pending_service)
	})

	//post

	app.Post("/customers", func(c *fiber.Ctx) error {

		var customer Customer

		err := c.BodyParser(&customer)

		if err != nil {
			log.Println(err)
		}

		customer.ID = uuid.New()

		statusCode := 200

		rp := db.Create(&customer)

		if rp.Error != nil {
			statusCode = 400
		}

		return c.SendStatus(statusCode)
	})

	app.Post("/orders", func(c *fiber.Ctx) error {

		var orders Customer

		err := c.BodyParser(&orders)

		if err != nil {
			log.Println(err)
		}

		orders.ID = uuid.New()

		statusCode := 200

		rp := db.Create(&orders)

		if rp.Error != nil {
			statusCode = 400
		}

		return c.SendStatus(statusCode)
	})

	app.Post("/pending_services", func(c *fiber.Ctx) error {

		var pendingServices Customer

		err := c.BodyParser(&pendingServices)

		if err != nil {
			log.Println(err)
		}

		pendingServices.ID = uuid.New()

		statusCode := 200

		rp := db.Create(&pendingServices)

		if rp.Error != nil {
			statusCode = 400
		}

		return c.SendStatus(statusCode)
	})

	app.Listen(":3000")
}
