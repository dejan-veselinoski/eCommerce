import { gql } from "apollo-angular";

export interface PossibleTypesResultData {
    possibleTypes: {
        [key: string]: string[]
    }
}

const result: PossibleTypesResultData = {
    "possibleTypes": {
        "ActiveOrderResult": [
            "NoActiveOrderError",
            "Order"
        ],
        "ErrorResult": [
            "AlreadyLoggedInError",
            "CouponCodeExpiredError",
            "CouponCodeInvalidError",
            "CouponCodeLimitError",
            "EmailAddressConflictError",
            "GuestCheckoutError",
            "IdentifierChangeTokenExpiredError",
            "IdentifierChangeTokenInvalidError",
            "IneligiblePaymentMethodError",
            "IneligibleShippingMethodError",
            "InsufficientStockError",
            "InvalidCredentialsError",
            "MissingPasswordError",
            "NativeAuthStrategyError",
            "NegativeQuantityError",
            "NoActiveOrderError",
            "NotVerifiedError",
            "OrderLimitError",
            "OrderModificationError",
            "OrderPaymentStateError",
            "OrderStateTransitionError",
            "PasswordAlreadySetError",
            "PasswordResetTokenExpiredError",
            "PasswordResetTokenInvalidError",
            "PasswordValidationError",
            "PaymentDeclinedError",
            "PaymentFailedError",
            "VerificationTokenExpiredError",
            "VerificationTokenInvalidError"
        ],
        "Node": [
            "Address",
            "Asset",
            "AuthenticationMethod",
            "Channel",
            "Collection",
            "Country",
            "Customer",
            "CustomerGroup",
            "Facet",
            "FacetValue",
            "Fulfillment",
            "HistoryEntry",
            "Order",
            "OrderLine",
            "Payment",
            "PaymentMethod",
            "Product",
            "ProductOption",
            "ProductOptionGroup",
            "ProductVariant",
            "Promotion",
            "Province",
            "Refund",
            "Role",
            "Seller",
            "ShippingMethod",
            "Surcharge",
            "Tag",
            "TaxCategory",
            "TaxRate",
            "User",
            "Zone"
        ],
        "PaginatedList": [
            "AssetList",
            "CollectionList",
            "CountryList",
            "CustomerList",
            "FacetList",
            "HistoryEntryList",
            "OrderList",
            "ProductList",
            "ProductVariantList",
            "PromotionList",
            "ProvinceList",
            "RoleList",
            "ShippingMethodList",
            "TagList",
            "TaxRateList"
        ],
        "RemoveOrderItemsResult": [
            "Order",
            "OrderModificationError"
        ],
        "SearchResultPrice": [
            "PriceRange",
            "SinglePrice"
        ]
    }
};
export default result;

export const ASSET_FRAGMENT = gql`
    fragment Asset on Asset {
        id
        width
        height
        name
        preview
        focalPoint {
            x
            y
        }
    }
`;

export const GET_ACTIVE_CHANNEL = gql`
    query GetActiveChannel {
        activeChannel {
            id
            code
            currencyCode
            defaultLanguageCode
        }
    }
`;

export const GET_PRODUCT_DETAIL = gql`
    query GetProductDetail($slug: String!) {
        product(slug: $slug) {
            id
            name
            description
            variants {
                id
                name
                options {
                    code
                    name
                }
                price
                priceWithTax
                sku
            }
            featuredAsset {
                ...Asset
            }
            assets {
                ...Asset
            }
            collections {
                id
                slug
                breadcrumbs {
                    id
                    name
                    slug
                }
            }
        }
    }
    ${ASSET_FRAGMENT}
`;


export const CART_FRAGMENT = gql`
    fragment Cart on Order {
        id
        code
        state
        active
        updatedAt
        orderPlacedAt
        lines {
            id
            featuredAsset {
                ...Asset
            }
            unitPrice
            unitPriceWithTax
            quantity
            linePriceWithTax
            discountedLinePriceWithTax
            productVariant {
                id
                name
            }
            discounts {
                amount
                amountWithTax
                description
                adjustmentSource
                type
            }
        }
        totalQuantity
        subTotal
        subTotalWithTax
        total
        totalWithTax
        shipping
        shippingWithTax
        shippingLines {
            priceWithTax
            shippingMethod {
                id
                code
                name
                description
            }
        }
        discounts {
            amount
            amountWithTax
            description
            adjustmentSource
            type
        }
    }
    ${ASSET_FRAGMENT}
`;

export const ERROR_RESULT_FRAGMENT = gql`
    fragment ErrorResult on ErrorResult {
        errorCode
        message
    }
`;

export const ADD_TO_CART = gql`
    mutation AddToCart($variantId: ID!, $qty: Int!) {
        addItemToOrder(productVariantId: $variantId, quantity: $qty) {
            ...Cart
            ...ErrorResult
            ...on InsufficientStockError {
                order {
                    ...Cart
                }
            }
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;

export const SEARCH_PRODUCTS = gql`
    query SearchProducts($input: SearchInput!) {
        search(input: $input) {
            items {
                productId
                slug
                productName
                description
                priceWithTax {
                    ... on PriceRange {
                        min
                        max
                    }
                }
                productAsset {
                    id
                    preview
                    focalPoint {
                        x
                        y
                    }
                }
            }
            totalItems
            facetValues {
                count
                facetValue {
                    id
                    name
                    facet {
                        id
                        name
                    }
                }
            }
        }
    }
`;

export const GET_COLLECTION = gql`
    query GetCollection($id: ID, $slug: String) {
        collection(id: $id, slug: $slug) {
            id
            name
            slug
            description
            featuredAsset {
                ...Asset
            }
            breadcrumbs {
                id
                slug
                name
            }
            children {
                id
                slug
                featuredAsset {
                    ...Asset
                }
                name
            }
        }
    }
    ${ASSET_FRAGMENT}
`;


export const GET_ACTIVE_ORDER = gql`
    query GetActiveOrder {
        activeOrder {
            ...Cart
        }
    }
    ${CART_FRAGMENT}
`;

export const GET_CART_TOTALS = gql`
    query GetCartTotals {
        activeOrder {
            id
            active
            totalQuantity
            totalWithTax
        }
    }
`;

export const GET_COLLECTIONS = gql`
    query GetCollections($options: CollectionListOptions) {
        collections(options: $options) {
            items {
                id
                name
                slug
                parent {
                    id
                    name
                    slug
                }
                featuredAsset {
                    ...Asset
                }
            }
        }
    }
    ${ASSET_FRAGMENT}
`;

export const ADJUST_ITEM_QUANTITY = gql`
    mutation AdjustItemQuantity($id: ID!, $qty: Int!) {
        adjustOrderLine(orderLineId: $id, quantity: $qty){
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;

export const REMOVE_ITEM_FROM_CART = gql`
    mutation RemoveItemFromCart($id: ID!) {
        removeOrderLine(orderLineId: $id){
            ...Cart
            ...ErrorResult
        }
    }
    ${CART_FRAGMENT}
    ${ERROR_RESULT_FRAGMENT}
`;
