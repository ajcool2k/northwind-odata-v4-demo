/*
<EntityType Name="Customer">
    <Key>
        <PropertyRef Name="CustomerID" />
    </Key>
    <Property Name="CustomerID" Type="Edm.String" Nullable="false" />
    <Property Name="CompanyName" Type="Edm.String" />
    <Property Name="ContactName" Type="Edm.String" />
    <Property Name="ContactTitle" Type="Edm.String" />
    <Property Name="Address" Type="Edm.String" />
    <Property Name="City" Type="Edm.String" />
    <Property Name="Region" Type="Edm.String" />
    <Property Name="PostalCode" Type="Edm.String" />
    <Property Name="Country" Type="Edm.String" />
    <Property Name="Phone" Type="Edm.String" />
    <Property Name="Fax" Type="Edm.String" />
    <Property Name="CustomerDemographics" Type="Collection(kendo_northwind_pg.Models.CustomerDemographic)" />
    <NavigationProperty Name="Orders" Type="Collection(kendo_northwind_pg.Models.Order)" />
</EntityType>
*/

import { Collection, Edm, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { CustomerDemographic } from './CustomerDemographic';
import { Order } from './Order';

@withEntitySetName('Customers')
@ODataModel({ name: 'Customers' })
export class Customer {

  @IncKeyProperty()
  @Edm.String
  CustomerID: string;

  @Property()
  @Edm.String
  CompanyName: string;

  @Property()
  @Edm.String
  ContactName: string;

  @Property()
  @Edm.String
  ContactTitle: string;

  @Property()
  @Edm.String
  Address: string;

  @Property()
  @Edm.String
  City: string;

  @Property()
  @Edm.String
  Region: string;

  @Property()
  @Edm.String
  PostalCode: string;

  @Property()
  @Edm.String
  Country: string;

  @Property()
  @Edm.String
  Phone: string;

  @Property()
  @Edm.String
  Fax: string;

  @Collection(Edm.ComplexType(CustomerDemographic))
  CustomerDemographics: CustomerDemographic[]

  @ODataNavigation({ type: 'OneToMany', entity: () => Order, targetForeignKey: 'CustomerID' })
  Orders: Order[];
}
