'use client'
import { PrintifyShippingResponse } from "@/interfaces/PrintifyTypes";
import { processAddressForm } from "../actions";
import { useFormStatus } from "react-dom";

export function AddressForm (parmas: {productId: string, shippingCost: PrintifyShippingResponse}) {
    const { productId, shippingCost } = parmas;
    const { pending } = useFormStatus()

    return (
        <form className="flex flex-col space-y-2" action={processAddressForm}>
            <label htmlFor="first_name">First Name</label> <input type="text" name="first_name" />  
            <label htmlFor="last_name">Last Name </label><input type="text" name="last_name"/>   
            <label htmlFor="email">Email</label><input type="email" name="email"/>      
            <label htmlFor="phone">Phone</label><input type="phone" name="phone"/>      
            <label htmlFor="country">Country</label><input type="text" name="country"/>     
            <label htmlFor="region">Region</label><input type="text" name="region"/>      
            <label htmlFor="address1">Address 1</label><input type="text" name="address1"/>   
            <label htmlFor="address2">Address 2</label><input type="text" name="address2"/>   
            <label htmlFor="city">City</label><input type="text" name="city"/>        
            <label htmlFor="zip">zip</label><input type="text" name="zip"/>         
            <button type="submit" className="btn btn</label>-primary" aria-disabled={pending}>Submit Order</button>
        </form>


    ) 
}
