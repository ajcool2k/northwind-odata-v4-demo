/*
    <ComplexType Name="Order_Detail">
        <Property Name="OrderID" Type="Edm.Int32" Nullable="false" />
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />
        <Property Name="UnitPrice" Type="Edm.Decimal" Nullable="false" />
        <Property Name="Quantity" Type="Edm.Int16" Nullable="false" />
        <Property Name="Discount" Type="Edm.Single" Nullable="false" />
        <NavigationProperty Name="Order" Type="kendo_northwind_pg.Models.Order" />
        <NavigationProperty Name="Product" Type="kendo_northwind_pg.Models.Product" />
    </ComplexType>
*/

import { BigNumber, ComplexType, Edm, ODataNavigation, Property, Required } from '@odata/server';
import { Order } from './Order';
import { Product } from './Product';

@ComplexType()
export class Order_Detail {

    @Required
    @Property()
    @Edm.Int32
    OrderID: number;

    @Required
    @Property()
    @Edm.Int32
    ProductID: number;

    @Required
    @Property({ type: "numeric" })
    @Edm.Decimal
    UnitPrice: BigNumber;

    @Required
    @Property()
    @Edm.Int16
    Quantity: number;

    @Required
    @Property()
    @Edm.Single
    Discount: number;

    @ODataNavigation({ type: 'OneToOne', entity: () => Order, foreignKey: 'OrderID' })
    Order: Order;

    @ODataNavigation({ type: 'OneToOne', entity: () => Product, foreignKey: 'ProductID' })
    Product: Product;
}
