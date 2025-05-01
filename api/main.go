package main

import (
	"github.com/gofiber/fiber/v2"
)

func main() {

	person := Person{
		Name: "John",
		Age:  30,
	}

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(person)
	})

	app.Get("/user", func(c *fiber.Ctx) error {
		return c.SendString("Olá mundo")
	})

	app.Get("/services", func(c *fiber.Ctx) error {
		return c.SendString("Olá mundo")
	})

	app.Get("/pending", func(c *fiber.Ctx) error {
		return c.SendString("Olá mundo")
	})

	app.Listen(":3000")
}
