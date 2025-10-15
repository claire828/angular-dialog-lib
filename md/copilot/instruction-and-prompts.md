# Copilot Instruction and Custom Prompts

## Instructions

### 設定 Instructions

- 到 VSCode User Setting 增加以下設定

```json
  "github.copilot.chat.codeGeneration.instructions": [
    {
      "file": ".github/copilot-instructions.md"
    },
    {
      "file": ".github/shared/copilot-instructions.md"
    }
  ],
  "github.copilot.chat.testGeneration.instructions": [

    {
      "file": ".github/test-instructions.md"
    },
    {
      "file": ".github/shared/test-instructions.txt"
    }
  ],
```

### Shared Instruction 與 個人 Instruction

設定中分成預設的 code generation instruction 以及 test generation instruction
並且各自有 shared `.github/shared/copilot-instructions.md` 以及個人的 `.github/copilot-instructions.md` 檔案

shared 資料夾會進 git 並且與團隊分享，個人檔案只會存在自己的電腦上

因此，個人偏好或是個人實驗用的盡量放在個人檔案，如果有發現好用的內容且團隊都適用，就直接調整 shared instruction

### Test Instructions

測試用的 Instruction 也是一樣分成 Shared 與個人，使用方式見手冊
此檔案在 copilot 使用 `/tests` 指令產生測試時會參照

## Prompt File

Instruction File 比較偏向基本的聊天設定，而 Prompt File 則是讓你在跟 Copilot 對話時可以動態指定，套用不同的 Prompt

### 設定 Prompt File

到 VSCode User Settings 加入以下設定

```json
  "chat.promptFiles": true,
  "chat.promptFilesLocations": {
    ".github/prompts": true,
    ".github/shared/prompts": true,
  }
```

prompt file 是一個個檔案，檔案名稱規則是 `${promptName}.prompt.md`

舉例來說，當你有一個 `.github/prompts/showMeTheMoney.prompt.md`
在聊天時就可以輸入 `/showMeTheMoney` 引用此 prompt file

### Shared Prompt Files 與 個人 Prompt Files

跟 Instruction Files 一樣，Prompt Files 也分成 Shared 跟個人使用。shared files 會進 git 並且與團隊分享，個人檔案只會存在自己的電腦上

因此，個人偏好或是個人實驗用的 prompt 盡量放在個人檔案，如果有發現好用的 prompt 且團隊都適用，就直接調整 shared instruction

## 參考資料

如需要進一步調整設定，一定要看過官方說明 <https://code.visualstudio.com/docs/copilot/copilot-customization>
