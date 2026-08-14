/**
 * Security ROI — incident / exposure based.
 *
 * Unlike the creator (gig-to-gear) model, security cameras don't "pay for
 * themselves" in a guaranteed way. The numbers below are estimates of loss
 * EXPOSURE, not a promise that cameras will prevent any specific incident.
 * The public pages must keep this distinction: potential loss exposure vs
 * estimated savings vs theoretical payback.
 */

export interface SecurityRoiInput {
  incidentType?: string;
  dailyLossEstimate?: number;
  incidentsPerMonth?: number;
  /** 0-100 — the owner's expectation of avoided incidents */
  preventionRate?: number;
  systemCost?: number;
  installationCost?: number;
  maintenanceCost?: number;
}

export interface SecurityRoiResult {
  monthlyLossExposure: number;
  annualLossExposure: number;
  monthlyEstimatedSavings: number;
  annualEstimatedSavings: number;
  totalCost: number;
  theoreticalPaybackMonths: number | null;
  theoreticalPaybackDays: number | null;
  disclaimer: string;
}

export const SECURITY_ROI_DISCLAIMER =
  'Estimates based on an incident-exposure scenario. A camera system de-risks losses — it does not guarantee any specific theft or incident will be prevented. Verify figures with your installer and insurer.';

export function calcSecurityRoi(input: SecurityRoiInput): SecurityRoiResult | null {
  const daily = Number(input.dailyLossEstimate) || 0;
  const perMonth = Number(input.incidentsPerMonth) || 0;
  const rate = Math.min(100, Math.max(0, Number(input.preventionRate) || 0)) / 100;

  const monthlyLossExposure = daily * perMonth;
  const annualLossExposure = monthlyLossExposure * 12;
  const monthlyEstimatedSavings = monthlyLossExposure * rate;
  const annualEstimatedSavings = monthlyEstimatedSavings * 12;

  const totalCost = (Number(input.systemCost) || 0) + (Number(input.installationCost) || 0);

  let theoreticalPaybackMonths: number | null = null;
  let theoreticalPaybackDays: number | null = null;
  if (monthlyEstimatedSavings > 0 && totalCost > 0) {
    theoreticalPaybackMonths = totalCost / monthlyEstimatedSavings;
    theoreticalPaybackDays = Math.round(theoreticalPaybackMonths * 30.44);
  }

  return {
    monthlyLossExposure,
    annualLossExposure,
    monthlyEstimatedSavings,
    annualEstimatedSavings,
    totalCost,
    theoreticalPaybackMonths,
    theoreticalPaybackDays,
    disclaimer: SECURITY_ROI_DISCLAIMER,
  };
}

export function formatRoiMoney(v: number): string {
  return `RM${Math.round(v).toLocaleString('en-MY')}`;
}
