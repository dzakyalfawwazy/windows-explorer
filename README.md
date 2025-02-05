# Windows Explorer (BackEnd dan Front End)

Aplikasi ini merupakan aplikasi yang memperlihatkan Root dari folder dan file seperti windows explorer. Aplikasi ini menggunakan JS dari backend dan frontend nya. Aplikasi ini backend dan frontend di push secara terpisah.

## 1. Back End
Adapun teknologi yang digunakan sebagai berikut:
 - node.js sebagai runtime JS
 - Express.js dan Typescript : framework
 - Prisma : Orm, migrasi dan Seeder Data
 - Faker Js : Seeding Random Data
 - Swagger : Documentasi API

Cara Run Backend :
1. Clone repositori.
2. Buka terminal `npm install`
3. Ubah .envexample ke .env sesuaikan isi nya
4. Jalankan `npx prisma migrate dev --name init` di terminal untuk makukan Migrasi database
5. Jalankan `npm run seed` untuk melakukan seeding database
6. Jalankan `npx nodemon` untuk run backend
7. Backend running di [localhost:5000/api/](http://localhost:5000/api/)
8. Silakan lihat dokumentasi API [localhost:5000/api-docs/](http://localhost:5000/api-docs/)

## 2. Front End
Adapun teknologi yang digunakan sebagai berikut:
  - Node JS sebagai runtime JS
  - Vue 3 & Vite sebagai framework
  - Tailwind CSS sebagai UI Component

Cara Run FrontEnd :
1. Clone Repositori
2. Buka Terminal jalankan `npm install`
3. Jalankan `npm run dev` untuk run frontend
4. Front End running di [http://localhost:5173/](http://localhost:5173/)

Best Regard
Dzaky Alfawwazy
