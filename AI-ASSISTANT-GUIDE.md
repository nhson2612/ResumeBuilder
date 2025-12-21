# 🤖 AI Assistant User Guide - Gemini CLI

Dự án này được tích hợp **Gemini AI Agent** để hỗ trợ tự động hóa quy trình phát triển. Dưới đây là hướng dẫn sử dụng các lệnh tương tác với bot.

Bot tên là: `@gemini-cli`

## 🚀 Các tính năng chính

### 1. 🌐 Tự động Dịch thuật (Auto Translate)
Tự động cập nhật file ngôn ngữ tiếng Việt (`vi.json`) dựa trên các key mới trong file tiếng Anh (`en.json`).

- **Cú pháp:**
  ```bash
  @gemini-cli /translate
  ```
- **Khi nào dùng:** Khi bạn vừa thêm text mới vào ứng dụng và cập nhật file `en.json`, thay vì tự dịch sang `vi.json`, hãy comment lệnh này vào Pull Request. Bot cẽ tự tạo commit dịch cho bạn.

### 2. 🔎 Review Code (Code Review)
Nhờ AI review code trong Pull Request để tìm lỗi logic, bảo mật, và tối ưu hóa.

- **Cú pháp:**
  ```bash
  @gemini-cli /review
  ```
  Hoặc kèm thêm ngữ cảnh:
  ```bash
  @gemini-cli /review Hãy chú ý kỹ phần bảo mật API
  ```
- **Tự động:** Bot cũng tự động trigger khi bạn mở một Pull Request mới.

### 3. 🏷️ Phân loại Issue (Triage)
Tự động đọc nội dung Issue và gán nhãn (Label) phù hợp.

- **Cú pháp:**
  ```bash
  @gemini-cli /triage
  ```
- **Tự động:** Bot tự động chạy khi có Issue mới được tạo.

### 4. 🛠️ Nhờ làm việc vặt (Invoke)
Giao các tác vụ lập trình cụ thể cho AI, như refactor code, viết test, sửa lỗi nhỏ.

- **Cú pháp:**
  ```bash
  @gemini-cli [yêu cầu của bạn]
  ```
- **Ví dụ:**
  > `@gemini-cli Hãy refactor file utils.js để code gọn hơn.`
  > `@gemini-cli Viết Unit Test cho component Button.`

## ⚠️ Lưu ý quan trọng
1. **Phê duyệt:** Với các tác vụ có sửa code (như Invoke), bot sẽ lên kế hoạch trước. Bạn cần comment `/approve` để đồng ý cho nó thực hiện.
2. **Kiểm tra lại:** Luôn review lại code do bot tạo ra trước khi merge. AI có thể mắc sai sót.
3. **Giới hạn:** Bot chỉ có quyền truy cập trong repo này, không thể làm việc bên ngoài phạm vi dự án.

---
*Tài liệu này dùng nội bộ cho team phát triển AI Resume Builder.*
