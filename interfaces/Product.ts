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

interface PrintifyVariantRequest {
  id: number;
  price: number;
  is_enabled?: boolean;
}

interface PrintifyPrintAreaRequest {
  variant_ids: number[];
  placeholders: PrintifyPlaceholderRequest[];
}

interface PrintifyPlaceholderRequest {
  position: string;
  images: PrintifyImageRequest[];
}

interface PrintifyImageRequest {
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