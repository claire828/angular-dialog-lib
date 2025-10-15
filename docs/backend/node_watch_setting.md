# ⚡ Nodemon + dotenv + tsx 開發環境設定筆記

這份筆記記錄如何在 Nx monorepo 中，使用 `nodemon` 搭配 `tsx` 與 `.env` 進行 Express API 開發，並避免常見坑。

---

## 📦 安裝必要套件

```bash
npm install -D tsx nodemon dotenv typescript
```

## 📦 dotenv

⚠️ .env 預設只會從 root 被自動載入，不要放在子資料夾。
在 main.ts（例如 {{project}}/src/main.ts）最上方加入：

```typescript
import dotenv from 'dotenv';
dotenv.config({ path: '{{project}}/.env' });
console.log('🚀 PORT:', process.env.PORT);
```

## 📦 nodemon 設定

### nodemon.json 設定檔放在專案子目錄的使用說明

```json
{
  "watch": ["content-analyzer-backend/src", ".env"],
  "ext": "ts,json,env",
  "exec": "tsx content-analyzer-backend/src/main.ts"
}
```

---

### 情境說明

- 預設情況下，`nodemon` 會自動讀取專案根目錄的 `nodemon.json`。
- 如果你想把 `nodemon.json` 放在 Nx monorepo 裡的某個子專案目錄（例如 `content-analyzer-backend/`）中，
  則需要在執行時告訴 `nodemon` 這個設定檔的位置。

---

### 實作方式

假設你的 `nodemon.json` 放在： `content-analyzer-backend/nodemon.json`

#### package.json

```json
  "content-analyzer-backend:nodemon": "nodemon --config content-analyzer-backend/nodemon.json",
```
