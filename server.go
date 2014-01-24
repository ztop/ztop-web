package main

import (
	"log"
	"net/http"
	"os"
)

func main() {
	port := "8000"
	if len(os.Args) > 1 {
		port = os.Args[1]
	}

	fileHandler := http.FileServer(http.Dir("/Users/tdixon/Code/ztop-web/public"))
	http.Handle("/", fileHandler)
	log.Println("Listening on port " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatal("ListenAndServer:", err)
	}
}
