# LumenWire

## Overview

**LumenWire** is a fintech payment infrastructure built on the **Stellar blockchain network** that enables seamless cross-currency settlements between crypto and fiat (Nigerian Naira).

It introduces a **dual liquidity pool architecture** that allows users to send cryptocurrency while recipients receive instant naira payouts directly into any Nigerian bank accounts — and vice versa — without relying on instant API-based crypto-to-fiat conversion.

Instead, settlement is handled through **liquidity-backed pools and transaction hash verification**, making the system more transparent, scalable, and resilient.

---


## FIGMA LINK

https://www.figma.com/design/4OtJbJMCL9PDjyl7Pse7J5/Untitled?node-id=0-1&p=f&t=SAeRF5q4Bdt6eZub-0

## Problem Statement

Existing crypto payment systems face several limitations:

- Heavy reliance on centralized exchange APIs for conversion  
- Delayed withdrawals and settlement times  
- High transaction fees and volatility risks  
- Lack of transparency in conversion processes  
- Poor integration with local banking infrastructure  

These challenges prevent crypto from being used effectively for real-world payments in Nigeria and similar markets.

---

## Solution

**LumenWire** solves these issues using a **dual liquidity pool system**:

- A **Crypto Liquidity Pool** for receiving and holding incoming crypto assets  
- A **Fiat Liquidity Pool** for instant naira payouts to bank accounts  
- **Transaction hash verification** as proof of valid crypto deposits  
- Real-time exchange rate locking at the point of confirmation  
- Instant settlement triggered by verified blockchain events  

This creates a trust-minimized, fast, and reliable payment rail between crypto and fiat.

---

## How It Works

### 1. Crypto Deposit (User 1 → Crypto Liquidity Pool)
- User 1 sends crypto (e.g., USDT/XLM) to the platform  
- Funds are deposited into the **Crypto Liquidity Pool**  
- A **transaction hash (TXN hash)** is generated on the Stellar blockchain  
- This serves as immutable proof of payment  

---

### 2. Transaction Verification
- The system monitors the Stellar blockchain in real time  
- Once confirmed, the transaction hash is validated  
- The exchange rate is locked at the exact time of confirmation  

---

### 3. Fiat Settlement (Fiat Liquidity Pool → User 2)
- The system triggers a settlement request  
- The **Fiat Liquidity Pool** releases the equivalent naira value  
- Funds are transferred directly into User 2’s Nigerian bank account  
- No crypto-to-fiat API conversion is used in this step  

---

### 4. Reverse Flow (Naira → Crypto)
- User deposits naira into the Fiat Liquidity Pool  
- Bank transfer reference is verified as proof of payment  
- Equivalent crypto is released from the Crypto Liquidity Pool  
- Funds are sent via the Stellar network to the recipient wallet  

---

## Key Features

-  Built on **Stellar blockchain for fast settlement**
-  Bidirectional conversion (Crypto ↔ Fiat)
-  Direct Nigerian bank account payouts
-  Dual liquidity pool architecture
-  Transaction hash-based verification system
-  Real-time exchange rate locking
-  No dependency on instant exchange APIs

---

## System Architecture

### Components

- **Stellar Network Layer**
  - Handles blockchain transactions and confirmations

- **Crypto Liquidity Pool**
  - Receives and holds incoming crypto deposits
  - Acts as proof layer for validation

- **Fiat Liquidity Pool**
  - Maintains naira reserves for instant payouts
  - Executes bank transfers

- **Settlement Engine**
  - Verifies transaction hashes
  - Locks exchange rates
  - Triggers cross-pool transfers

- **Bank Integration Layer**
  - Handles Nigerian bank payouts and confirmations

---

## Use Cases

- Freelancers receiving international crypto payments  
- Businesses accepting global crypto payments but settling in naira  
- Cross-border remittances  
- P2P crypto-to-fiat transfers  
- Merchant payment infrastructure for African markets  

---

## Impact

LumenWire bridges the gap between blockchain-based payments and real-world financial systems by introducing a **liquidity-backed settlement model**.

It improves:

- Transaction speed  
- Transparency in settlement  
- Accessibility for non-crypto users  
- Adoption of blockchain payments in everyday commerce  

---

## Future Improvements

- Automated liquidity balancing between pools  
- Smart rate optimization engine  
- Merchant API integrations  
- Multi-country fiat support expansion  
- On-chain liquidity provider incentives  
- Mobile application integration  

---


## License

This project is currently in early-stage conceptual development.
