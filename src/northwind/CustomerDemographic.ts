/*
<ComplexType Name="CustomerDemographic">
    <Property Name="CustomerTypeID" Type="Edm.String" />
    <Property Name="CustomerDesc" Type="Edm.String" />
    <NavigationProperty Name="Customers" Type="Collection(kendo_northwind_pg.Models.Customer)" />
</ComplexType>
*/

import { ComplexType, Edm, ODataNavigation, Property } from '@odata/server';
import { Customer } from './Customer';

@ComplexType()
export class CustomerDemographic {

    @Property()
    @Edm.String
    CustomerTypeID: string;

    @Property()
    @Edm.String
    CustomerDesc: string;

    @ODataNavigation({ type: 'OneToMany', entity: () => Customer, targetForeignKey: 'CustomerID' })
    Customers: Customer[];
}
