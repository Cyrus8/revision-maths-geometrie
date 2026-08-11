"use client";

import { useState } from "react";
import { Card } from "@/components/Card";

function round(value: number): number {
  if (!Number.isFinite(value)) return value;
  return Number(value.toPrecision(12));
}

function compute(a: number, b: number, op: string): number {
  switch (op) {
    case "+":
      return a + b;
    case "−":
      return a - b;
    case "×":
      return a * b;
    case "÷":
      return b === 0 ? NaN : a / b;
    default:
      return b;
  }
}

export function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previous, setPrevious] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [overwrite, setOverwrite] = useState(true);

  function inputDigit(digit: string) {
    if (overwrite) {
      setDisplay(digit === "." ? "0." : digit);
      setOverwrite(false);
      return;
    }
    if (digit === "." && display.includes(".")) return;
    setDisplay((current) => (current === "0" && digit !== "." ? digit : current + digit));
  }

  function clearAll() {
    setDisplay("0");
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }

  function backspace() {
    if (overwrite) return;
    setDisplay((current) => (current.length > 1 ? current.slice(0, -1) : "0"));
  }

  function toggleSign() {
    setDisplay((current) => {
      if (current === "0") return current;
      return current.startsWith("-") ? current.slice(1) : `-${current}`;
    });
  }

  function chooseOperator(nextOperator: string) {
    const value = parseFloat(display);
    if (previous !== null && operator && !overwrite) {
      const result = round(compute(previous, value, operator));
      setPrevious(result);
      setDisplay(String(result));
    } else {
      setPrevious(value);
    }
    setOperator(nextOperator);
    setOverwrite(true);
  }

  function equals() {
    if (previous === null || !operator) return;
    const value = parseFloat(display);
    const result = round(compute(previous, value, operator));
    setDisplay(Number.isNaN(result) ? "Erreur" : String(result));
    setPrevious(null);
    setOperator(null);
    setOverwrite(true);
  }

  function square() {
    const value = parseFloat(display);
    setDisplay(String(round(value * value)));
    setOverwrite(true);
  }

  function squareRoot() {
    const value = parseFloat(display);
    setDisplay(value < 0 ? "Erreur" : String(round(Math.sqrt(value))));
    setOverwrite(true);
  }

  const keyClass =
    "min-h-11 rounded-xl border border-border bg-white text-base font-medium text-foreground transition-colors hover:border-accent hover:bg-accent-soft";
  const opClass =
    "min-h-11 rounded-xl border border-border bg-muted text-base font-medium text-accent transition-colors hover:border-accent hover:bg-accent-soft";

  return (
    <Card className="p-4">
      <h2 className="text-sm font-semibold text-foreground">Calculatrice</h2>
      <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-white px-3 py-3 text-right font-mono text-xl text-foreground">
        {display}
      </div>
      <div className="mt-3 grid grid-cols-4 gap-2">
        <button type="button" className={opClass} onClick={clearAll}>
          C
        </button>
        <button type="button" className={opClass} onClick={backspace}>
          ⌫
        </button>
        <button type="button" className={opClass} onClick={squareRoot}>
          √
        </button>
        <button type="button" className={opClass} onClick={square}>
          x²
        </button>

        <button type="button" className={keyClass} onClick={() => inputDigit("7")}>
          7
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("8")}>
          8
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("9")}>
          9
        </button>
        <button type="button" className={opClass} onClick={() => chooseOperator("÷")}>
          ÷
        </button>

        <button type="button" className={keyClass} onClick={() => inputDigit("4")}>
          4
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("5")}>
          5
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("6")}>
          6
        </button>
        <button type="button" className={opClass} onClick={() => chooseOperator("×")}>
          ×
        </button>

        <button type="button" className={keyClass} onClick={() => inputDigit("1")}>
          1
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("2")}>
          2
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("3")}>
          3
        </button>
        <button type="button" className={opClass} onClick={() => chooseOperator("−")}>
          −
        </button>

        <button type="button" className={keyClass} onClick={toggleSign}>
          ±
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit("0")}>
          0
        </button>
        <button type="button" className={keyClass} onClick={() => inputDigit(".")}>
          ,
        </button>
        <button type="button" className={opClass} onClick={() => chooseOperator("+")}>
          +
        </button>
      </div>
      <button
        type="button"
        onClick={equals}
        className="mt-2 min-h-11 w-full rounded-xl bg-accent text-base font-medium text-accent-foreground transition-colors hover:opacity-90"
      >
        =
      </button>
    </Card>
  );
}
