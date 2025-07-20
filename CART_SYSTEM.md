# Cart System Implementation

## Overview

This cart system implements a **local-first approach with backend synchronization** for authenticated users. The system provides a smooth user experience while maintaining data consistency across devices.

## Features

### Guest Users

- ✅ **Local cart only** - Cart stored in Redux + localStorage
- ✅ **No backend interaction** - All operations are local
- ✅ **No cart migration** - Cart is cleared when guest logs in
- ✅ **Instant UI updates** - No loading states for cart operations

### Authenticated Users

- ✅ **Local-first with backend sync** - Immediate local updates + backend sync
- ✅ **Cross-device synchronization** - Same cart across all devices
- ✅ **Persistent cart** - Cart survives logout/login cycles
- ✅ **Offline detection** - Cart disabled when offline
- ✅ **Optimistic updates** - UI updates immediately, then syncs

## User Flows

### Guest → Login

1. Guest adds items to local cart
2. Guest clicks login
3. **Local cart is cleared** (no warning)
4. User starts with empty backend cart
5. User can now add items that sync across devices

### User → Logout

1. User has cart with items in backend
2. User logs out
3. **Local cart is cleared**
4. User becomes guest with empty local cart
5. Backend cart is preserved for next login

### Authenticated User - Online

1. User adds item to cart
2. **Immediate local update** (instant UI)
3. **Background backend sync** (immediate)
4. If sync fails, error is shown but local state kept

### Authenticated User - Offline

1. User goes offline
2. **Cart functionality is disabled**
3. Add/remove buttons are disabled
4. Warning message shown: "Cart disabled - offline"

## API Endpoints

### Cart Routes (Protected)

- `POST /api/cart/add` - Add item to cart
- `GET /api/cart/get` - Get user's cart
- `DELETE /api/cart/remove/:foodId` - Remove/decrease item
- `DELETE /api/cart/clear` - Clear entire cart

### Request/Response Format

#### Add to Cart

```javascript
// Request
POST /api/cart/add
{
  "foodId": "64f...",
  "quantity": 1
}

// Response
{
  "message": "Cart updated successfully",
  "cart": [
    {
      "_id": "cart_item_id",
      "foodId": {
        "_id": "64f...",
        "name": "Pizza",
        "price": 15.99,
        "imageUrl": "uploads/pizza.jpg"
      },
      "quantity": 2
    }
  ]
}
```

## Code Architecture

### Core Files

#### 1. Cart Service (`/services/cartService.js`)

- Handles all backend API calls
- Includes offline detection
- Throws errors when offline

#### 2. Cart Slice (`/reducers/slicers/cartSlice.js`)

- **Guest operations**: `addToCartLocal`, `removeFromCartLocal`, `clearCartLocal`
- **User operations**: `addToCartWithSync`, `removeFromCartWithSync`, `clearCartWithSync`
- **Auth transitions**: `resetToGuestMode`, `clearOnLogin`
- **Optimistic updates** for authenticated users

#### 3. useCart Hook (`/hooks/useCart.js`)

- **Smart hook** that automatically chooses local vs backend operations
- Monitors online status
- Handles authentication state changes
- Provides unified API for components

#### 4. Updated Components

- **Dish.jsx** - Uses useCart hook, shows status indicators
- **Cart.jsx** - Shows system status (online/offline/sync)
- **CartTotal.jsx** - Handles both guest and user cart structures
- **CartItems.jsx** - Improved totals calculation

### State Management

#### Guest Cart Structure

```javascript
{
  cartItems: [
    {
      foodId: "64f...",
      quantity: 2,
      name: "Pizza",
      price: 15.99,
      image: "pizza.jpg",
      description: "Delicious pizza",
      category: "Italian"
    }
  ],
  // ... other fields
}
```

#### User Cart Structure (from backend)

```javascript
{
  cartItems: [
    {
      _id: "cart_item_id",
      foodId: {
        _id: "64f...",
        name: "Pizza",
        price: 15.99,
        imageUrl: "uploads/pizza.jpg"
      },
      quantity: 2
    }
  ],
  // ... other fields
}
```

## Error Handling

### Offline Scenarios

- **Guest users**: Cart works normally (local only)
- **Authenticated users**: Cart is disabled, buttons show disabled state

### Network Errors

- **Failed sync**: Error message shown, local state preserved
- **Backend unavailable**: Cart operations disabled for authenticated users

### Authentication Errors

- **Invalid token**: User logged out automatically
- **Session expired**: Redirect to login

## Best Practices

### Performance

- ✅ **Immediate UI updates** - No waiting for backend
- ✅ **Background sync** - Backend calls don't block UI
- ✅ **Optimistic updates** - Assume success, rollback on error

### UX

- ✅ **Clear status indicators** - Online/offline/syncing states
- ✅ **Disabled states** - Clear when actions are unavailable
- ✅ **Error messages** - Helpful error descriptions

### Data Consistency

- ✅ **Single source of truth** - Backend for users, local for guests
- ✅ **No cart migration** - Clean separation between guest/user
- ✅ **Immediate sync** - Every cart action triggers backend sync

## Testing Scenarios

### 1. Guest Cart

```bash
# Test local cart operations
- Add items as guest
- Remove items as guest
- Refresh page (should persist)
- Clear cart
```

### 2. Guest → Login

```bash
# Test cart clearing on login
- Add items as guest
- Login
- Verify cart is empty
- Add new items (should sync to backend)
```

### 3. User → Logout → Login

```bash
# Test cart persistence
- Login and add items
- Logout
- Login again
- Verify same cart items
```

### 4. Cross-Device Sync

```bash
# Test device synchronization
- Login on device A, add items
- Login on device B
- Verify same cart
- Add item on device B
- Check device A (should update)
```

### 5. Offline Scenarios

```bash
# Test offline behavior
- Login and go offline
- Try to add items (should be disabled)
- Go online (should re-enable)
```

## Troubleshooting

### Common Issues

#### Cart not syncing

- Check network connection
- Verify authentication token
- Check browser console for errors

#### Cart cleared unexpectedly

- Expected behavior when guest logs in
- Expected behavior when user logs out

#### Items not appearing

- For guests: Check localStorage
- For users: Check backend API response
- Verify food item structure matches expected format

### Debug Commands

```javascript
// Check cart state
console.log(store.getState().cart);

// Check auth state
console.log(store.getState().user);

// Check online status
console.log(navigator.onLine);
```
