# Role-Based Permissions

## Overview
The College App now has role-based access control to ensure students can only view information, while teachers and admins can edit and manage data.

## User Roles

### 1. Student (Default)
**Can:**
- ✅ View timetable
- ✅ View attendance history
- ✅ View and download notes
- ✅ View assignments
- ✅ Submit assignments
- ✅ View results and performance
- ✅ View achievements
- ✅ View and edit their own profile

**Cannot:**
- ❌ Edit timetable
- ❌ Mark attendance
- ❌ Upload notes
- ❌ Create assignments
- ❌ Edit grades/marks
- ❌ Modify other students' data

### 2. Teacher/Admin
**Can:**
- ✅ All student permissions
- ✅ Edit timetable (Edit Mode button)
- ✅ Mark attendance for students
- ✅ Upload and manage notes
- ✅ Create and manage assignments
- ✅ Grade assignments
- ✅ View all student data

## Page-Specific Permissions

### Timetable Page
- **Students**: View-only access
- **Teachers**: Can toggle "Edit Mode" to modify schedule

### Attendance Page
- **Students**: Can only view their attendance history
- **Teachers**: Can mark attendance using camera/scan ID

### Notes Page
- **Students**: Can view, filter, and download notes
- **Teachers**: Can upload new notes + all student permissions

### Assignments Page
- **Students**: Can view and submit assignments
- **Teachers**: Can create assignments and view submissions

### Results Page
- **Students**: View-only access to their own results
- **Teachers**: Can view and edit all student results (future feature)

## How to Test Different Roles

### Login as Student:
1. Go to Login page
2. Select "Student" role
3. Click "Sign In"
4. You'll see view-only interface

### Login as Teacher:
1. Go to Login page
2. Select "Teacher" role
3. Click "Sign In"
4. You'll see additional edit buttons and upload options

## Implementation Details

Each protected page checks the user role:
```javascript
const { user } = useAuth();
const isTeacher = user?.role === 'Teacher' || user?.role === 'Admin';
```

Then conditionally renders features:
```javascript
{isTeacher && (
  <Button>Edit Mode</Button>
)}
```

## Security Notes

⚠️ **Important**: This is frontend-only validation. In a production app:
- Backend API should verify user roles
- Database should enforce permissions
- JWT tokens should contain role information
- All sensitive operations should be authenticated server-side
