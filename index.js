const express = require('express');
const bodyParser = require('body-parser');
require("dotenv").config();

const app = express();
const port = process.env.API_PORT;
const queryCompany = require('./services/company');
const queryOffice = require('./services/office');

// const db = require('services/tableCreate.js');

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const prefix = '/api';
const url = {
    company: '/company',
    companyId: '/company/:id',
    office: '/office',
    officeId: '/office/:id',
}

/* COMPANY */
app.get(prefix + url.company, queryCompany.getCompanies);
app.get(prefix + url.companyId, queryCompany.getCompanyById);
app.post(prefix + url.company, queryCompany.createCompany);
app.put(prefix + url.companyId, queryCompany.updateCompany);
app.delete(prefix + url.companyId, queryCompany.deleteCompany);

/* OFFICE */
app.get(prefix + url.office + url.companyId, queryOffice.getOffices);
app.get(prefix + url.officeId, queryOffice.getOfficeById);
app.post(prefix + url.office, queryOffice.createOffice);
app.put(prefix + url.officeId, queryOffice.updateOffice);
app.delete(prefix + url.officeId, queryOffice.deleteOffice);

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
