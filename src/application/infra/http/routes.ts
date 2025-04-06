import e, { Router } from "express";
import {
  getAllUsers,
  getUserBills,
} from "../../queries/filter-bills-by-options.js";
import {
  getCumulativeTotalByYear,
  getEnergyResultsByYear,
  getFinanceResultsByYear,
} from "../../queries/get-statistics.js";

const router = Router();

const BASE_PATH = "/api";

router.get(`${BASE_PATH}/users`, async (req, res) => {
  const data = await getAllUsers();
  return res.json(data);
});

router.get(`${BASE_PATH}/users/:clientNumber`, async (req, res) => {
  const { clientNumber } = req.params;

  const { start, end, month } = req.query;

  const startYear = start ? String(start) : undefined;
  const endYear = end ? String(end) : undefined;
  const months = month ? new Array(month).flat().map(Number) : undefined;

  const data = await getUserBills({ clientNumber, startYear, endYear, months });

  return res.json({ data });
});

// statistics
router.get(`${BASE_PATH}/statistics/total`, async (req, res) => {
  const { startYear, endYear } = req.query;
  if (!startYear) return res.status(404).end();

  const start = String(startYear);
  const end = endYear ? String(endYear) : undefined;

  const data = await getCumulativeTotalByYear(start, end);
  return res.json(data);
});

router.get(`${BASE_PATH}/statistics/energy-results`, async (req, res) => {
  const { startYear, endYear } = req.query;
  if (!startYear) return res.status(404).end();

  const start = String(startYear);
  const end = endYear ? String(endYear) : undefined;

  const data = await getEnergyResultsByYear(start, end);
  return res.json(data);
});

router.get(`${BASE_PATH}/statistics/finance-results`, async (req, res) => {
  const { startYear, endYear } = req.query;
  if (!startYear) return res.status(404).end();

  const start = String(startYear);
  const end = endYear ? String(endYear) : undefined;

  const data = await getFinanceResultsByYear(start, end);
  return res.json(data);
});

export { router };
