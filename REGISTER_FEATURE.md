# Register Feature Implementation Guide

## What We Just Built ✅

You now have a **complete user registration system** that mirrors your backend `POST /api/auth/register` endpoint.

---

## File Changes Summary

### 1. **Validation Schema** (`src/lib/validations/auth.ts`)

✅ Added `registerSchema` with Zod

- Email validation (required, valid format)
- Password validation (min 8 chars, matches confirmPassword)
- First/Last name validation
- Role selection (required)
- Optional fields: phone, companyId, departmentId

### 2. **API Service** (`src/lib/api/auth.ts`)

✅ Added `authApi.register()` method

- Converts form data to backend format
- Handles optional numeric fields (companyId, departmentId)
- Returns typed response with user data

### 3. **Register Page** (`src/app/(auth)/register/page.tsx`)

✅ Complete registration form with:

- Form validation via React Hook Form + Zod
- All required fields with error messages
- Password confirmation matching
- Loading state during submission
- Success toast → redirect to /login
- Error handling with user-friendly messages
- Link to login page for existing users

### 4. **Login Page Update** (`src/app/(auth)/login/page.tsx`)

✅ Added link to /register for new users

---

## User Flow Diagram

```
┌─────────────────────────────────────────┐
│   1. User visits /register               │
│   (or clicks "Sign up" from /login)      │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   2. Registration Form Appears           │
│   - First/Last Name                      │
│   - Email                                │
│   - Role Selection                       │
│   - Phone (optional)                     │
│   - Password (min 8 chars)               │
│   - Confirm Password                     │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│   3. User Submits Form                   │
│   - Frontend validation (Zod)            │
│   - POST to /api/auth/register           │
└────────────────┬────────────────────────┘
                 │
         ┌───────┴────────┐
         │                │
         ↓ Success        ↓ Error
    ┌─────────┐      ┌────────────┐
    │ Toast   │      │ Error Toast│
    │"Success"│      │ Message    │
    └────┬────┘      └────────────┘
         │
         ↓
    ┌─────────────┐
    │ Redirect to │
    │   /login    │
    └─────────────┘
```

---

## How to Test It

### Test Case 1: Successful Registration

1. Navigate to `http://localhost:3000/register`
2. Fill in the form:
   ```
   First Name: John
   Last Name: Doe
   Email: john.doe@example.com
   Role: Recruiter
   Phone: (555) 123-4567
   Password: SecurePassword123
   Confirm Password: SecurePassword123
   ```
3. Click "Create account"
4. **Expected:** Success toast, redirect to /login
5. Can now login with these credentials

### Test Case 2: Validation Errors

Try these to see validation work:

**Invalid Email:**

```
Email: invalid.email
Click Submit → Error: "Invalid email address"
```

**Password Too Short:**

```
Password: 1234567 (7 chars)
Click Submit → Error: "Password must be at least 8 characters"
```

**Passwords Don't Match:**

```
Password: SecurePassword123
Confirm Password: DifferentPassword
Click Submit → Error: "Passwords do not match"
```

**Missing Required Field:**

```
Leave "First name" empty
Click Submit → Error: "First name is required"
```

### Test Case 3: Backend Error

1. Fill form correctly
2. Backend returns error (e.g., email already taken)
3. **Expected:** Error toast with message from backend

---

## Technical Details

### Form Validation Flow

```typescript
// User enters data
<Input {...register('email')} />

// React Hook Form + Zod validates
const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  role: z.enum(['ADMIN', 'RECRUITER', ...]),
  // ...
})
.refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})

// If valid, calls API
await authApi.register(values)

// API transforms and sends to backend
POST /api/auth/register
{
  email: "john.doe@example.com",
  password: "SecurePassword123",
  firstName: "John",
  lastName: "Doe",
  role: "RECRUITER",
  phone: "(555) 123-4567",
  companyId: null,
  departmentId: null
}
```

### Response Handling

**Success Response (201):**

```typescript
{
  id: 1,
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  role: "RECRUITER",
  company: null,
  createdAt: "2026-03-04T10:30:00"
}

// Frontend transforms to:
{
  id: 1,
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  name: "John Doe", // computed
  role: "RECRUITER",
  company: null,
  createdAt: "2026-03-04T10:30:00"
}
```

**Error Response (400):**

```typescript
{
  error: "Bad Request",
  message: "Email already registered"
}

// Frontend shows: "Email already registered"
```

---

## API Endpoint Breakdown

### POST /api/auth/register

**Request:**

```json
{
  "email": "john.doe@example.com",
  "password": "SecurePassword123",
  "firstName": "John",
  "lastName": "Doe",
  "role": "RECRUITER",
  "phone": "(555) 123-4567",
  "companyId": null,
  "departmentId": null
}
```

**Response (201 Created):**

```json
{
  "id": 1,
  "email": "john.doe@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "RECRUITER",
  "company": null,
  "joinedDate": "2026-03-04",
  "createdAt": "2026-03-04T10:30:00",
  "updatedAt": "2026-03-04T10:30:00"
}
```

**Error Responses:**

```json
// 400 Bad Request - Validation failed
{
  "error": "Bad Request",
  "message": "Email already registered"
}

// 400 Bad Request - Invalid role
{
  "error": "Bad Request",
  "message": "Invalid role provided"
}
```

---

## Key Features Implemented

✅ **Frontend Validation**

- Email format validation
- Password strength (min 8 chars)
- Password confirmation matching
- Required field validation

✅ **User-Friendly UX**

- Clear input labels
- Inline error messages
- Loading state during submission
- Success/error toast notifications
- Link to login page

✅ **Secure Handling**

- Password confirmation field
- No password stored in local state longer than needed
- Tokens stored after login (not in registration)
- Proper error messages without exposing internals

✅ **Integration with Existing System**

- Uses existing auth store
- Matches login flow
- Consistent styling with login page
- Proper routing and redirects

---

## Possible Enhancements (Future)

```typescript
// 1. Email verification requirement
// POST /api/auth/register → requires email verification email

// 2. Company/Department selection for Vendor/Partner users
// Show conditional fields based on role

// 3. Terms of Service checkbox
// registerSchema.refine(data => data.agreeToTerms === true, {
//   message: 'You must agree to terms'
// })

// 4. Social login (Google, GitHub)
// authApi.loginWithGoogle(idToken)

// 5. Strong password indicator
// Show "Weak → Fair → Strong" based on complexity
```

---

## Files Created/Modified

```
✅ src/lib/validations/auth.ts
   └─ Added registerSchema and RegisterFormValues type

✅ src/lib/api/auth.ts
   └─ Added register() method and RegisterData interface

✅ src/app/(auth)/register/page.tsx
   └─ New file - Complete registration form page

✅ src/app/(auth)/login/page.tsx
   └─ Added sign up link
   └─ Added Link import
```

---

## Next Steps

### To Test in Your Browser:

1. Start frontend: `npm run dev`
2. Go to `http://localhost:3000/register`
3. Try the test cases above
4. Check browser console for any errors (should be none)
5. Verify toast notifications work

### Before Going to Production:

- [ ] Confirm backend register endpoint is working
- [ ] Test with actual database (not in-memory)
- [ ] Verify email doesn't get stored in plain text in logs
- [ ] Add email verification requirement (optional)
- [ ] Load test registration endpoint

---

## Troubleshooting

**Issue: Form errors don't show**

- Check that error messages are being returned from validation
- Verify Input component renders error prop correctly
- Check browser console for TypeScript errors

**Issue: API calls fail**

- Ensure backend is running on `localhost:8080`
- Check CORS settings if getting 403 errors
- Verify API base URL in `src/lib/api/client.ts`

**Issue: Redirect to /login doesn't work**

- Check Next.js routing in `src/app/(auth)/`
- Verify useRouter import from 'next/navigation' (not 'next/router')

**Issue: Toast notifications don't appear**

- Verify ToastProvider is in root layout
- Check react-hot-toast is installed: `npm list react-hot-toast`

---

## You've Successfully Built:

✅ Complete registration feature with:

- Form validation (frontend)
- Backend API integration
- Error handling
- Success flow (redirect to login)
- Responsive UI matching your design system
- Type-safe TypeScript code
- Proper error messages

**Next: We can build the Login enhancements or move to Offers module!** 🚀
