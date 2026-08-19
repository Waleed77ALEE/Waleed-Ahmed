export interface Web3WalletState {
  isConnected: boolean;
  address: string | null;
  provider: string | null;
  balanceUsdt: number;
}

class Web3Manager {
  private static instance: Web3Manager;
  private state: Web3WalletState = {
    isConnected: false,
    address: null,
    provider: null,
    balanceUsdt: 1250.00
  };
  private listeners: ((state: Web3WalletState) => void)[] = [];

  private constructor() {
    try {
      const cached = localStorage.getItem('wka_web3_wallet');
      if (cached) {
        this.state = JSON.parse(cached);
      }
    } catch (e) {
      // ignore
    }
  }

  public static getInstance(): Web3Manager {
    if (!Web3Manager.instance) {
      Web3Manager.instance = new Web3Manager();
    }
    return Web3Manager.instance;
  }

  public getState(): Web3WalletState {
    return { ...this.state };
  }

  public subscribe(listener: (state: Web3WalletState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notify() {
    localStorage.setItem('wka_web3_wallet', JSON.stringify(this.state));
    this.listeners.forEach(l => l(this.state));
  }

  public async connectWallet(providerName: 'MetaMask' | 'Binance Wallet' | 'Bitget Wallet' | 'Reown'): Promise<Web3WalletState> {
    await new Promise((res) => setTimeout(res, 600));
    const mockAddress = '0x71C...' + Math.floor(1000 + Math.random() * 9000);
    this.state = {
      isConnected: true,
      address: mockAddress,
      provider: providerName,
      balanceUsdt: 2450.50
    };
    this.notify();
    return this.state;
  }

  public disconnect() {
    this.state = {
      isConnected: false,
      address: null,
      provider: null,
      balanceUsdt: 0
    };
    this.notify();
  }

  public async payWithUsdt(amountUsdt: number, recipientAddress: string): Promise<{ success: boolean; txHash: string }> {
    await new Promise((res) => setTimeout(res, 800));
    if (this.state.balanceUsdt < amountUsdt) {
      throw new Error('Insufficient USDT balance in connected Web3 wallet.');
    }
    this.state.balanceUsdt -= amountUsdt;
    this.notify();
    const txHash = '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('');
    return { success: true, txHash };
  }
}

export const web3Manager = Web3Manager.getInstance();
