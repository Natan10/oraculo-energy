import { Router } from "express";
import { filterBillsByOptions } from "../queries/filter-bills-by-options.js";
import {
  getCumulativeTotalByYear,
  getEnergyResultsByYear,
  getFinanceResultsByYear,
} from "../queries/get-statistics.js";

const router = Router();

const BASE_PATH = "/api";

router.get(`${BASE_PATH}/filterBy`, async (req, res) => {
  const { year, clientNumber, installNumber, page, pageSize } = req.query;
  const data = await filterBillsByOptions({
    page: page ? Number(page) : 1,
    pageSize: pageSize ? Number(pageSize) : 10,
    year: year ? String(year) : undefined,
    clientNumber: clientNumber ? String(clientNumber) : undefined,
    installNumber: installNumber ? String(installNumber) : undefined,
  });

  return res.json(data);
});

router.get(`${BASE_PATH}/statistics/total`, async (req, res) => {
  const { year } = req.query;
  if (!year) return res.status;

  const data = await getCumulativeTotalByYear(String(year));
  return res.json(data);
});

router.get(`${BASE_PATH}/statistics/energy-results`, async (req, res) => {
  const { year } = req.query;
  if (!year) return res.status(404);
  const data = await getEnergyResultsByYear(String(year));
  return res.json(data);
});

router.get(`${BASE_PATH}/statistics/finance-results`, async (req, res) => {
  const { year } = req.query;
  if (!year) return res.status(404);
  const data = await getFinanceResultsByYear(String(year));
  return res.json(data);
});

export { router };
