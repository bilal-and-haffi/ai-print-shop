Mostly from https://chat.openai.com/c/97f8530f-d52f-46a0-95ee-7691530bb250

- [ ] **Capture and Store the Custom Image**
  - [ ] Ensure the image meets Printify's format and resolution requirements.
  - [x] Implement a system to store images temporarily.
  - [x] Display image on frontend 
      - [x] test on prod
- [ ] Post generated image to printify so that it can be used in a product 

- [ ] **Create a Product with the Custom Image**
  - [ ] Use the Printify API to dynamically create a product when a purchase is intended.
    - [ ] Prepare the API request to `POST /v1/shops/{shop_id}/products` with the necessary details.
    - [ ] Include the customer's custom image in the request payload.
    - [ ] Select the appropriate product type (e.g., t-shirt, mug) based on the customer's choice.

- [ ] **Submit the Order to Printify**
  - [ ] Immediately create an order for the custom product in your Printify shop.
    - [ ] Prepare the API request to `POST /v1/orders`.
    - [ ] Include customer’s shipping information and any other necessary details in the request.
    - [ ] Account for the bespoke nature of the item, typically with a quantity of one.

- [ ] **Direct Fulfillment and Customer Notification**
  - [ ] Monitor the order's progress through the Printify system.
    - [ ] Implement a mechanism to notify customers about their order status.
      - [ ] Confirm order receipt and provide production updates.
      - [ ] Send shipping information and tracking details.
  - [ ] Use Printify API endpoints to automate status updates and notifications.
