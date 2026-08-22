import React, { useState } from 'react';
import { Copy, Check, QrCode, ShieldCheck, ArrowRight } from 'lucide-react';

interface CryptoOption {
  id: string;
  coin: string;
  network: string;
  address: string;
  color: string;
}

const cryptoOptions: CryptoOption[] = [
  { id: 'usdt_trc20', coin: 'USDT', network: 'Tron (TRC20)', address: 'TPsc1QT4Hxk78Ltb6oNqVhW8ZsZwHUbCeF', color: 'text-teal-400' },
  { id: 'usdt_bep20', coin: 'USDT', network: 'BNB Smart Chain (BEP20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-teal-400' },
  { id: 'usdt_erc20', coin: 'USDT', network: 'Ethereum (ERC20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-teal-400' },
  { id: 'btc_bitcoin', coin: 'BTC', network: 'Bitcoin', address: '1MD7rjtoHG7YKQC2f191LtdsvDVtxUNv6d', color: 'text-orange-400' },
  { id: 'btc_segwit', coin: 'BTC', network: 'BTC (SegWit)', address: 'bc1qvywpm7esy62qzj4le33mffsxx2zdmzgyreud4e', color: 'text-orange-400' },
  { id: 'btc_bep20', coin: 'BTC', network: 'BNB Smart Chain (BEP20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-orange-400' },
  { id: 'eth_bep20', coin: 'ETH', network: 'BNB Smart Chain (BEP20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-blue-400' },
  { id: 'bnb_bep20', coin: 'BNB', network: 'BNB Smart Chain (BEP20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-yellow-400' },
  { id: 'bnb_opbnb', coin: 'BNB', network: 'opBNB', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-yellow-400' },
  { id: 'usdc_bep20', coin: 'USDC', network: 'BNB Smart Chain (BEP20)', address: '0x6d9db1d673650538578308e8abbe9b212f6bd970', color: 'text-blue-400' },
  { id: 'ltc_litecoin', coin: 'LTC', network: 'Litecoin', address: 'LNr7hHGE28SA1GtDeoACJ7Y44DWYRPhVEr', color: 'text-slate-300' }
];

export const CryptoPaymentSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('usdt_trc20');
  const [copiedAddress, setCopiedAddress] = useState(false);

  const selectedCrypto = cryptoOptions.find(c => c.id === selectedId) || cryptoOptions[0];

  const handleCopy = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  return (
    <div className="p-5 rounded-2xl bg-slate-950 border border-teal-500/30 space-y-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <span className="px-2.5 py-0.5 rounded-full w-max bg-teal-500/20 text-teal-300 text-[10px] font-black uppercase tracking-wider border border-teal-500/30 inline-flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" />
          Direct Crypto Wallets
        </span>
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
          Choose Network carefully
        </span>
      </div>

      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
          Select Coin & Network
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {cryptoOptions.map((crypto) => (
            <button
              key={crypto.id}
              onClick={() => setSelectedId(crypto.id)}
              className={`p-2 rounded-xl text-left border transition-all ${
                selectedId === crypto.id
                  ? 'bg-slate-900 border-teal-500/50 shadow-md shadow-teal-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-800'
              }`}
            >
              <span className={`block font-black text-sm ${crypto.color}`}>{crypto.coin}</span>
              <span className="block text-[10px] text-slate-400 truncate">{crypto.network}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border-2 border-slate-800 flex flex-col md:flex-row gap-5 items-center md:items-start">
          {/* QR Code */}
          <div className="shrink-0 p-2 bg-white rounded-xl shadow-lg">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${selectedCrypto.address}`}
              alt={`${selectedCrypto.coin} ${selectedCrypto.network} QR Code`}
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg"
            />
          </div>
          
          <div className="flex-1 w-full space-y-4 text-center md:text-left">
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Network Type
              </span>
              <span className={`text-base font-black ${selectedCrypto.color}`}>
                {selectedCrypto.network}
              </span>
            </div>
            
            <div className="space-y-1.5 w-full">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Deposit Address
              </span>
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex-1 w-full font-mono text-xs sm:text-sm font-black text-white bg-slate-950 border border-slate-800 rounded-lg p-2.5 truncate select-all">
                  {selectedCrypto.address}
                </div>
                <button
                  onClick={() => handleCopy(selectedCrypto.address)}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-black transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                    copiedAddress 
                      ? 'bg-emerald-500 text-slate-950' 
                      : 'bg-teal-500 hover:bg-teal-400 text-slate-950'
                  }`}
                >
                  {copiedAddress ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAddress ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <p className="text-[10px] text-rose-400 font-bold flex items-center justify-center md:justify-start gap-1">
              <ArrowRight className="w-3 h-3" />
              Send only {selectedCrypto.coin} to this deposit address.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
