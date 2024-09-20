import React, { useState } from "react";
import { IDRupiah } from "./utils";

const App: React.FC = () => {
  const [costPrice, setCostPrice] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [weightInGram, setWeightInGram] = useState<number>(0);
  const [sellingPrice, setSellingPrice] = useState<number | null>(null);
  const [wonToIDR, setWonToIDR] = useState<number>(11.8);
  const [logisticFee, setLogisticFee] = useState<number>(160_000);
  const [history, setHistory] = useState<number[]>([]);

  function calculateSellingPrice() {
    const basePrice = costPrice * wonToIDR;
    const deliveryFee = (weightInGram / 1000) * logisticFee;

    const sellingPrice = basePrice + deliveryFee + profitMargin;
    setSellingPrice(sellingPrice);
    setHistory([...history, sellingPrice]);
  }

  function resetState() {
    setCostPrice(0);
    setProfitMargin(0);
    setWeightInGram(0);
    setSellingPrice(null);
    setWonToIDR(11.8);
    setLogisticFee(160_000);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Kalkulator Harga Jual (Dalkkumi)
        </h1>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Harga barang (won)
          </label>
          <input
            type="number"
            value={costPrice}
            onChange={(e) => setCostPrice(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan harga barang"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Kurs (WON/IDR)
          </label>
          <input
            type="number"
            value={wonToIDR}
            onChange={(e) => setWonToIDR(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan kurs (WON/IDR)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Berat barang (gram)
          </label>
          <input
            type="number"
            value={weightInGram}
            onChange={(e) => setWeightInGram(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan berat (gram)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Biaya pengiriman / 1000g (rupiah)
          </label>
          <input
            type="number"
            value={logisticFee}
            onChange={(e) => setLogisticFee(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan biaya pengiriman (rupiah)"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Keuntungan (rupiah)
          </label>
          <input
            type="number"
            value={profitMargin}
            onChange={(e) => setProfitMargin(parseFloat(e.target.value))}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Masukkan keuntungan (rupiah)"
          />
        </div>
        <div className="flex justify-around gap-1">
          <button
            onClick={calculateSellingPrice}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Hitung
          </button>
          <button
            onClick={resetState}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
          >
            Reset
          </button>
        </div>
        {sellingPrice !== null && (
          <div className="mt-4 text-center">
            <p className="text-lg">
              Harga Jual:{" "}
              <span className="font-bold">{IDRupiah.format(sellingPrice)}</span>
            </p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-4 text-center">
            <p className="text-lg">Riwayat:</p>
            <ul>
              {history.map((item, index) => (
                <li className="font-bold" key={index}>
                  {IDRupiah.format(item)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
