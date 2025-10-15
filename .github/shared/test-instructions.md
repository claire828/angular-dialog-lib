# Test Instruction for frontend

- the framework is angular 16 and typescript，生成的程式碼必須清晰、易讀且維護性高，並遵循 Angular 與 Jest 的最佳實踐。
- 撰寫具備完整 setup 與 teardown 流程的單元測試，使用 Angular TestBed 進行測試環境設定
- 使用 Jest 語法如 jest.spyOn，不使用 Jasmine
- 如果牽扯到 lifecycle hooks，有可能需要使用 waitForAsync 或 fakeAsync 來處理非同步問題
- 當元件採用 OnPush 策略時，利用 fixture.componentRef.setInput() 更新 @Input 屬性並觸發 detectChanges()。這種方式可以確保 OnPush 元件在設定輸入值後立即進行變更檢測，從而正確更新畫面。
- 要產測試元件的時候，依據以下幾個方向來處理
  1. Creation Tests
     - Verify component instantiation
     - Check initial state values
     - Ensure dependencies are correctly injected
  2. Input/Output Tests
     - Validate @Input properties are handled correctly
     - Verify @Output events emit expected values
     - Test OnChanges lifecycle behavior
  3. Component Method Tests
     - Test public methods functionality
     - Verify state changes after method execution
     - Test private methods indirectly through public API
  4. UI Interaction Tests
     - Test user clicks, typing, and form interactions
     - Verify event handlers respond correctly
     - Test keyboard shortcuts and accessibility actions
  5. UI State Tests
     - Verify conditional rendering based on state
     - Test component appearance in different states
     - Validate CSS classes applied conditionally
  6. Integration Tests
     - Test component interactions with services
     - Verify child component interactions
     - Test directive and pipe integrations
  7. Asynchronous Tests
     - Test Observable subscription behavior
     - Verify proper handling of promises
     - Test loading states and async operations
  8. Edge Case & Error Handling Tests
     - Test boundary conditions
     - Verify error state displays
     - Test recovery from error conditions
