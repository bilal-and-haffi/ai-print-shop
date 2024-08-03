export interface Image {
    id: string;
}

export interface PrintifyProductRequest {
    title: string;
    description: string;
    blueprint_id: number;
    print_provider_id: number;
    variants: PrintifyVariantRequest[];
    print_areas: PrintifyPrintAreaRequest[];
}

export interface CreateProductResponse {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: ProductOption[];
    variants: ProductVariant[];
    images: ProductImage[];
    created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    is_printify_express_eligible: boolean;
    is_printify_express_enabled: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: PrintArea[];
    sales_channel_properties: any[]; // Adjust type accordingly
}

export interface ProductOption {
    name: string;
    type: string;
    values: { id: number; title: string }[];
}

export interface ProductVariant {
    id: number;
    sku: string;
    cost: number;
    price: number;
    title: string;
    grams: number;
    is_enabled: boolean;
    is_default: boolean;
    is_available: boolean;
    is_printify_express_eligible: boolean;
    options: number[];
}

export interface ProductImage {
    src: string;
    variant_ids: number[];
    position: string;
    is_default: boolean;
}

export interface PrintArea {
    variant_ids: number[];
    placeholders: Placeholder[];
    background: string;
}

export interface Placeholder {
    position: string;
    images: {
        id: string;
        name: string;
        type: string;
        height: number;
        width: number;
        x: number;
        y: number;
        scale: number;
        angle: number;
    }[];
}

export interface PrintifyVariantRequest {
    id: number;
    price: number;
    is_enabled?: boolean;
}

export interface PrintifyPrintAreaRequest {
    variant_ids: number[];
    placeholders: PrintifyPlaceholderRequest[];
}

export interface PrintifyPlaceholderRequest {
    position: string;
    images: PrintifyImageRequest[];
}

export interface PrintifyImageRequest {
    id: string;
    x: number;
    y: number;
    scale: number;
    angle: number;
}

export interface PrintifyImageResponse {
    id: string;
    file_name: string;
    height: number;
    width: number;
    size: number;
    mime_type: string;
    preview_url: string;
    upload_time: string;
}

export interface RetrieveProductResponse {
    id: string;
    title: string;
    description: string;
    tags: string[];
    options: ProductOption[];
    variants: ProductVariant[];
    images: ProductImage[];
    created_at: string;
    updated_at: string;
    visible: boolean;
    is_locked: boolean;
    is_printify_express_eligible: boolean;
    is_printify_express_enabled: boolean;
    blueprint_id: number;
    user_id: number;
    shop_id: number;
    print_provider_id: number;
    print_areas: PrintArea[];
    sales_channel_properties: any[]; // Adjust type accordingly
}

export interface PrintifyShippingRequest {
    line_items: Array<{
        product_id?: string;
        variant_id: number;
        quantity: number;
    }>;
    address_to: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        country: string;
        region?: string;
        address1: string;
        address2?: string;
        city: string;
        zip: string;
    };
}

export interface PrintifyOrderExistingProductRequest {
    external_id: string;
    label?: string;
    line_items: LineItemBase[];
    shipping_method: number; // Required to specify what method of shipping is desired, "1" means standard shipping, "2" means express shipping. It is stored as an integer.
    is_printify_express?: boolean;
    send_shipping_notification?: boolean;
    address_to: AddressTo;
}

export interface LineItemBase {
    product_id: string;
    variant_id: number;
    quantity: number;
}

export interface LineItemFull extends LineItemBase {
    id: string;
    print_provider_id: number;
    shipping_cost: number;
    cost: number;
    status: string;
    metadata: {
        title: string;
        price: number;
        variant_label: string;
        sku: string;
        country: string;
    };
}

export interface AddressTo {
    first_name: string;
    last_name?: string;
    email?: string;
    phone?: string;
    country: string;
    region: string;
    address1: string;
    address2?: string;
    city: string;
    zip: string;
}

export interface PrintifyOrderResponse {
    id: string;
    address_to: {
        first_name: string;
        last_name: string;
        region: string;
        address1: string;
        city: string;
        zip: string;
        email: string;
        phone: string;
        country: string;
        company: string;
    };
    line_items: LineItemFull[];
    metadata: {
        order_type: string;
        shop_order_id: number;
        shop_order_label: string;
        shop_fulfilled_at: string;
    };
    total_price: number;
    total_shipping: number;
    total_tax: number;
    status: string;
    shipping_method: number;
    is_printify_express: boolean;
    shipments: {
        carrier: string;
        number: string;
        url: string;
        delivered_at: string;
    }[];
    created_at: string;
    sent_to_production_at: string;
    fulfilled_at: string;
    printify_connect: { url: string; id: string };
}

export interface PrintifyShippingResponse {
    standard: number;
    express: number;
    priority: number;
}

export interface EssentialProductDetails {
    id: number;
    color: string;
    size: string;
}

export interface Placeholder {
    position: string;
    height: number;
    width: number;
}

export interface Options {
    [key: string]: string;
}
