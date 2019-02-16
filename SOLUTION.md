# Solution description

I decided to use MySQL DB for storing data as I already had it on my machine installed.
As an ORM I'm using Sequelize and user authentication is done via JWT.

## Set-up
1. configure DB access under `/server/db/config/config.json`
1. create your database `vestberry_test` manually
1. run migrations + seeders by executing:
```bash
cd server/db/
../../node_modules/.bin/sequelize db:migrate
../../node_modules/.bin/sequelize db:seed:all
```

## List of implemented mutations and queries

### USER
open to public
```
mutation {
  userLogin(email:"admin@test.com", password:"admin")
}
```

open to public
```
mutation {
  userSignup(email:"admin2@test.com", password:"admin2")
}
```
### BOOKS
open to public
```
query getBooks {
  books(limit:2,offset:1,search:"the"){
    title
    author {
      id
      name
      last_name
    }
    year
	  genres
    rating
  }
}
```
authenticated only
```
query getBook {
  book(id:1){
    id
    title
	  author {
      id
      name
      last_name
    }
    year
	  genres
    rating
  }
}
```
authenticated only
```
mutation {
  createBook(title: "Test", author_id: 1, year:1998, genres: "genre1, genre2", rating: 5.7777) {
    id
    title
    year
    genres
    rating
    author {
      name
      last_name
    }
  }
}
```
authenticated only
```
mutation {
  updateBook(id: 1, title: "The Call of the Wild", author_id: 1, year:1904, genres: "genre2, genre3", rating: 5.7777) {
    id
    title
    year
    genres
    rating
    author {
      name
      last_name
    }
  }
}
```
authenticated only
```
mutation {
  deleteBook(id: 1) {
    id
    title
    year
  }
}
```

### HISTORY
authenticated only - history is updated after creating or updating book

```
query getHistory {
  history(book_id:1){
    book_id
    user_id
    title
    author {
      id
      name
      last_name
    }
    year
    rating
    created
  }
}
```

### AUTHORS
authenticated only
```
query getAuthors {
  authors(limit:2,offset:1){
    id
    name
    last_name
    books {
      title
      year
    }
  }
}
```
authenticated only
```
query getAuthor {
  author(id:1){
    id
    name
    last_name
  }
}
```
authenticated only
```
mutation {
  createAuthor(name: "Jack", last_name: "Karouac") {
    id
    name
    last_name
  }
}
```
authenticated only
```
mutation {
  updateAuthor(id: 1, name: "Jack", last_name: "London") {
    id
    name
    last_name
  }
}
```
authenticated only
```
mutation {
  deleteAuthor(id: 3) {
    id
    name
    last_name
  }
}
```
