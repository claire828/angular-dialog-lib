# Generate MR Description

gitlab project_id: `DYSK_Labs/website`

if given mr url like this: https://gitlab.com/DYSK_Labs/website/-/merge_requests/1234 , the mr id is the url part after `/merge_requests` , which is `1234`
依照下面範本，使用繁體中文台灣用語產生 MR Description

---

# Timeline

若 Reviewer 無法在 _預設填隔天下班_ 前完成 review，請告知 Author。

# Goal

_描述此 MR 的主要目標，如 feature 實作 / 修 bug / 效能改善 / 設計改善。_

_ClickUp Task 連結_

_若是其他改善，請附上問題說明_

# Changes

_以容易閱讀理解的順序，條列式說明 **修改內容與 Goal 的關係**_

_重要性：修改意圖 > 行為描述 > 實作細節。_

_細節可以善用 comment_

# Verification

- _驗證改動內容確實達成目標，描述步驟、邏輯和結果。_
- _附上相關自動化測試之程式碼連結，若沒有，請提供理由，例如：效能需求過高、無法取得去識別化的測資。_
- _驗證系統及其他可能受改動影響的功能可以正常運行，例如：重啟 server 並檢查 containers 狀態、重新登入、landing page 顯示正常等。_

# Evaluation (Optional)

_若修改跟 效能、機敏資料、部署設定、環境、infra 相關：_

- _評估可行性，確保程式可在部署環境 (以 staging 為準，考量硬體規格和負載) 上運行。_
- _評估改動的外部影響及相關風險，如 DB 操作、網路流量、檔案讀寫、外部服務連線等，並提供風險控制措施。_
- _列出須被記錄之事件 (如對關鍵資料的操作) 及指標 (如同時連線人數)，並提供相關機制如 health checking / logging / alerting。_

# Note & Acknowledgement (Optional)

- _其他未來回顧時需要的內容，例如當下時空背景的敘述。_
- _若引用外部資源（如 stack overflow 或開源套件），附上來源並明白相關之 LICENSE 和 copyright 內容。_
- _若有任何參與協助者，提及他們的貢獻並表達感謝。_

# Future Work (Optional)

_在 MR merge 之後會執行的計畫，可以是 Author 自己的規劃或 Reviewer `nit:` 的內容。_

# Ready for Review Check List

- [ ] 已自行 Review，呈現易於 Review 的內容，並對 Reviewers 可能提出的問題，進行設想和說明。
- [ ] 除了 MR description 外，已透過以下形式，使後續維護順利
  - 提供充分的資訊，包括：易理解的程式 / 程式內 comments / MR comments / labels。
  - 若有特殊需求，留下 comments 並 @ 相關人員，例如：多位 reviewers / merge deadline / merge dependencies。
  - 若改動會影響部署維護流程，將 task 加到 [Technical Transfer to FAE](https://app.clickup.com/3625226/v/li/222153450)。
- [ ] 已詳細閱讀以下文件（請留意版號）：
  - [Code Review Guideline for aetherAI v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Code-Review-Guideline-for-aetherAI)
  - [Verification Policy v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Merge-Request-Verification-Policy)
  - [Software License 懶人包 v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Software-LICENSE-%E6%87%B6%E4%BA%BA%E5%8C%85)

# Approval Check List

**按下 Approve 即代表下列事項皆為真**

- 充分理解並認同 Author 提供的內容（包括 MR description 和 comments）。
- 針對 Author 未提供的內容，已進行適度的挑戰，包括：過於精簡的 Evaluation & Verification、edge case、設計選擇、替代方案等。
- 同意此 MR 的所有改動，合乎當下時空背景的需要，需特別注意以下情況：在 feature MR 中做大範圍重構、過度設計、刪除了還未完全棄用的程式等。
- 已詳細閱讀以下文件（請留意版號）：
  - [Code Review Guideline for aetherAI v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Code-Review-Guideline-for-aetherAI)
  - [Verification Policy v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Merge-Request-Verification-Policy)
  - [Software License 懶人包 v2025.02.20](https://gitlab.com/DYSK_Labs/the-hitchhiker-s-guide-to-the-web-team/-/wikis/Software-LICENSE-%E6%87%B6%E4%BA%BA%E5%8C%85)

---
