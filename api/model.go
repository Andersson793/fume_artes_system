package main

type Person struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

type Customer struct {
	ID   int    `gorm:"default:gen_random_uuid()"`
	Name string `json:"name"`
}

type Order struct {
	ID       int    `gorm:"default:gen_random_uuid()"`
	Date     string `json:"date"`
	Value    int    `json:"value"`
	Customer string `json:"customer"`
}

type User struct {
	ID    string `gorm:"default:gen_random_uuid()"` // db func
	Name  string `json:"name"`
	Email string `json:"email"`
	Type  string `json:"type"`
}

type ServicePending struct {
	ID          int    `gorm:"default:gen_random_uuid()"`
	User        User   `json:"user"`
	Date        string `json:"date"`
	Description string `json:"description"`
}
