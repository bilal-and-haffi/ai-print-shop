export interface Image {
  id: string;


}
export interface PrintifyProductRequest {
  title: string;
  description: string;
  price: number;
  blueprint_id: number;
  print_provider_id: number;
  variants: {
    id: number;
    price: number;
  }[]
  print_areas: [{
    variant_ids: number[],
    placeholders: [{
        position: string,
        images: string[]
    }],
  }]
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