/**
 * Represents a single item in the checkout process.
 * @typedef {Object} ChargilyItem
 * @property {string} id - The unique identifier for the item.
 * @property {string} name - The name of the item.
 * @property {number} price - The price of one unit of the item.
 * @property {number} quantity - The number of units of the item.
 */
type ChargilyItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

/**
 * Represents the input data required to create a Chargily checkout.
 * This structure accommodates both simple and detailed orders,
 * supporting either a direct amount or itemized listings.
 *
 * @typedef {Object} ChargilyCheckoutInput
 * @property {Item[]} [items] - An array of items being sold. Required if amount and currency are not provided.
 * @property {number} [amount] - The total amount of the checkout. Required if items are not provided.
 * @property {string} [currency] - The currency of the amount. Required if amount is provided. Typically "dzd".
 * @property {string} [payment_method="edahabia"] - The payment method to be used. Default is "edahabia". Options include "edahabia" and "cib".
 * @property {string} success_url - The URL to which the customer will be redirected after a successful payment.
 * @property {string} [customer_id] - The ID of an existing customer, if applicable.
 * @property {string} failure_url - The URL to which the customer will be redirected after a failed or canceled payment.
 * @property {string} [webhook_endpoint] - The URL of your endpoint that will receive webhook events from Chargily Pay.
 * @property {string} [description] - A description of the checkout to provide additional context for the transaction.
 * @property {string} [locale="en"] - The language of the checkout page. Accepted values are "ar", "en", or "fr".
 * @property {boolean} [pass_fees_to_customer] - Whether the Chargily Pay fees will be paid by the merchant or passed to the customer.
 * @property {string} [shipping_address] - The shipping address of the customer for the checkout.
 * @property {boolean} [collect_shipping_address] - Indicates whether the shipping address should be collected from the customer.
 * @property {number} [percentage_discount] - A percentage discount that will be applied to the total amount of the checkout. Cannot be used with `amount_discount`.
 * @property {number} [amount_discount] - An amount discount that will be applied to the total amount of the checkout. Cannot be used with `percentage_discount`.
 * @property {Record<string, any>} [metadata] - A set of key-value pairs that can be used to store additional information about the product or transaction.
 */
export type ChargilyCheckoutInput = {
  items?: ChargilyItem[]; // Optional, required if 'amount' and 'currency' are not provided
  amount?: number; // Required if 'items' is not provided
  currency?: string; // Required if 'amount' is provided, should be "dzd"
  payment_method?: string; // Default is "edahabia", could also be "cib"
  success_url: string; // Required, URL after successful payment
  customer_id?: string; // Optional, ID of an existing customer
  failure_url: string; // Required, URL after failed or canceled payment
  webhook_endpoint?: string; // Optional, endpoint for Chargily webhook events
  description?: string; // Optional, description of the checkout
  locale?: string; // Optional, defaults could be 'ar', 'en', or 'fr'
  pass_fees_to_customer?: boolean; // Indicates if fees are passed to the customer
  shipping_address?: string; // Optional, shipping address of the customer
  collect_shipping_address?: boolean; // Indicates if shipping address should be collected
  percentage_discount?: number; // Optional, cannot be used with 'amount_discount'
  amount_discount?: number; // Optional, cannot be used with 'percentage_discount'
  metadata?: Record<string, any>; // Optional, additional information in key-value pairs
};

/**
 * Defines the structure for the response received from a Chargily checkout operation.
 * This response includes all necessary details about the checkout session created via Chargily.
 *
 * @typedef {Object} ChargilyCheckoutResponse
 * @property {string} id - Unique identifier for the checkout session.
 * @property {string} entity - The type of entity, usually 'checkout'.
 * @property {boolean} livemode - Indicates whether the checkout is in live mode.
 * @property {number} amount - The total amount of the checkout.
 * @property {string} currency - The currency code for the transaction, typically 'dzd'.
 * @property {number} fees - The transaction fees applied.
 * @property {number} pass_fees_to_customer - Indicates if the fees are passed to the customer (0 or 1).
 * @property {string} status - The status of the checkout, e.g., 'pending', 'paid', 'failed'.
 * @property {string} locale - The locale of the checkout, usually 'en', 'ar', or 'fr'.
 * @property {string|null} description - A description of the checkout, can be null.
 * @property {any|null} metadata - Additional metadata associated with the checkout, can be null.
 * @property {string} success_url - URL to redirect to after a successful payment.
 * @property {string} failure_url - URL to redirect to after a payment failure.
 * @property {string|null} webhook_endpoint - The endpoint URL for receiving webhooks, can be null.
 * @property {string|null} payment_method - The payment method used, can be null.
 * @property {string|null} invoice_id - The invoice identifier associated with the checkout, can be null.
 * @property {string} customer_id - The identifier of the customer involved in the checkout.
 * @property {string|null} payment_link_id - The payment link identifier, can be null.
 * @property {number} created_at - Timestamp when the checkout was created.
 * @property {number} updated_at - Timestamp when the checkout was last updated.
 * @property {string|null} shipping_address - The shipping address for the checkout, can be null.
 * @property {number} collect_shipping_address - Indicates if the shipping address should be collected (0 or 1).
 * @property {{type: string, value: number} | null} discount - Details of any discount applied, can be null.
 * @property {number} amount_without_discount - The total amount without discount.
 * @property {string} checkout_url - The URL to the checkout page where payment is processed.
 */
export type ChargilyCheckoutResponse = {
  id: string;
  entity: string;
  livemode: boolean;
  amount: number;
  currency: string;
  fees: number;
  pass_fees_to_customer: number;
  status: string;
  locale: string;
  description: string | null;
  metadata: any | null;
  success_url: string;
  failure_url: string;
  webhook_endpoint: string | null;
  payment_method: string | null;
  invoice_id: string | null;
  customer_id: string;
  payment_link_id: string | null;
  created_at: number;
  updated_at: number;
  shipping_address: string | null;
  collect_shipping_address: number;
  discount: {
    type: string;
    value: number;
  } | null;
  amount_without_discount: number;
  checkout_url: string;
};

// Type for the webhook event itself, including the event data
export type ChargilyWebhookEvent = {
  id: string;
  entity: string;
  type: string; // More specific type can be used if the list of event types is known
  data: ChargilyEventData;
  created_at: number;
  updated_at: number;
  livemode: boolean;
};
// Define the base structure for any Chargily event data
export type ChargilyEventData = {
  id: string;
  fees: number;
  amount: number;
  entity: string;
  locale: string;
  status: string;
  currency: string;
  discount: null | { type: string; value: number }; // Assuming potential structure of discount if not null
  livemode: boolean;
  metadata: any | null;
  created_at: number;
  updated_at: number;
  invoice_id: string | null;
  customer_id: string;
  description: string | null;
  failure_url: string | null;
  success_url: string;
  checkout_url: string;
  payment_method: string;
  payment_link_id: string | null;
  shipping_address: ShippingAddress; // This needs a definition based on the actual structure
  webhook_endpoint: string;
  pass_fees_to_customer: number;
  amount_without_discount: number | null;
  collect_shipping_address: number;
};

// Define a structure for ShippingAddress if available in the webhook data
type ShippingAddress = {
  street?: string; // These fields should match the actual properties
  city?: string;
  postalCode?: string;
  country: string;
};
