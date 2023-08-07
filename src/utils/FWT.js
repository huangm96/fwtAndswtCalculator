import fwt_standardWithholdingRate from "../withholdingRate/fwt_standardWithholdingRate";
import fwt_withholdingRateWithMultipleJob from "../withholdingRate/fwt_withholdingRateWithMultipleJob";

class FederalWithholdingTax {
  #taxableWage;
  #payPeriods;
  #status;
  #multipleJobs;
  #otherIncome;
  #deductions;
  #w4;
  #allowances;
  #dependentCredits;
  #additionalAmountWithhold;
  constructor({
    otherIncome = 0,
    deductions = 0,
    multipleJobs,
    status,
    taxableWage,
    payPeriods,
    w4,
    allowances = 0,
    dependentCredits = 0,
    additionalAmountWithhold = 0,
  }) {
    this.#taxableWage = taxableWage;
    this.#payPeriods = payPeriods;
    this.#status = status;
    this.#multipleJobs = multipleJobs;
    this.otherIncome = otherIncome;
    this.#deductions = deductions;
    this.#allowances = allowances;
    this.#w4 = w4;
    this.#dependentCredits = dependentCredits;
    this.#additionalAmountWithhold = additionalAmountWithhold;
  }
  step_1_annualAmount() {
    return Math.round(this.#taxableWage * this.#payPeriods);
  }
  step_1_2020W4FormLater_adjustedAnnualWageAmount() {
    const d_1 = this.#otherIncome;
    const e_1 = this.step_1_annualAmount() + d_1;

    const f_1 = this.#deductions;
    let g_1;
    if (this.#multipleJobs) {
      g_1 = 0;
    } else {
      if (this.#status === "married") {
        g_1 = 12900;
      } else {
        g_1 = 8600;
      }
    }
    const h_1 = f_1 + g_1;
    const adjustedAnnualWageAmount = e_1 - h_1;
    return Math.round(
      adjustedAnnualWageAmount > 0 ? adjustedAnnualWageAmount : 0
    );
  }

  step_1_Earlier2020W4Form_adjustedAnnualWageAmount() {
    const k_1 = 4300 * this.#allowances;
    const adjustedAnnualWageAmount = this.step_1_annualAmount() - k_1;
    return Math.round(
      adjustedAnnualWageAmount > 0 ? adjustedAnnualWageAmount : 0
    );
  }

  step_2_figureTentativeWithholdingAmount() {
    let a_2;
    if (this.#w4 === "earlier2020") {
      a_2 = this.step_1_Earlier2020W4Form_adjustedAnnualWageAmount();
    } else {
      a_2 = this.step_1_2020W4FormLater_adjustedAnnualWageAmount();
    }
    const row = this.findAnnualPercentageMethodTable(a_2);
    const b_2 = row.columnA;
    const c_2 = row.columnC;
    const d_2 = row.columnD;
    const e_2 = a_2 - b_2;
    const f_2 = e_2 * d_2;
    const g_2 = c_2 + f_2;
    const tentativeWithholdingAmount = g_2 / this.#payPeriods;
    return Math.round(tentativeWithholdingAmount);
  }
  step_3_AccountForTaxCredits() {
    const a_3 = this.#w4 === "2020Later" ? this.#dependentCredits : 0;
    const b_3 = Math.round(a_3 / this.#payPeriods);
    const c_3 = this.step_2_figureTentativeWithholdingAmount() - b_3;
    return Math.round(c_3 > 0 ? c_3 : 0);
  }
  result() {
    const a_4 = this.#additionalAmountWithhold;
    return this.step_3_AccountForTaxCredits() + a_4;
  }
  findAnnualPercentageMethodTable(wage) {
    let withholdingRate, annualPercentageMethodTable, row;
    if (this.#w4 === "earlier2020") {
      withholdingRate = fwt_standardWithholdingRate;
    } else {
      withholdingRate = this.#multipleJobs
        ? fwt_withholdingRateWithMultipleJob
        : fwt_standardWithholdingRate;
    }

    switch (this.#status) {
      case "single":
        annualPercentageMethodTable = withholdingRate.single;
        break;
      case "married":
        annualPercentageMethodTable = withholdingRate.married;
        break;
      case "head":
        annualPercentageMethodTable = withholdingRate.head;
        break;
      default:
        break;
    }
    for (let item of annualPercentageMethodTable) {
      if (item.high > wage) {
        row = item;
        break;
      }
    }
    return {
      columnA: row.low,
      columnB: row.high,
      columnC: row.tentativeAmountWithhod,
      columnD: row.percentage,
      columnE: row.paymentExceeds,
    };
  }
}

export default FederalWithholdingTax;
