/*
<EntityType Name="Supplier">
    <Key>
      <PropertyRef Name="SupplierID" />
    </Key>
    <Property Name="SupplierID" Type="Edm.Int32" Nullable="false" />
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
    <Property Name="HomePage" Type="Edm.String" />
    <NavigationProperty Name="Products" Type="Collection(kendo_northwind_pg.Models.Product)" />
</EntityType>
*/


import { Edm, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Product } from './Product';

@withEntitySetName('Suppliers')
@ODataModel({ name: 'Suppliers' })
export class Supplier {

  @IncKeyProperty()
  @Edm.Int32
  SupplierID: number;

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

  @Property()
  @Edm.String
  HomePage: string;

  @ODataNavigation({ type: 'OneToMany', entity: () => Product, targetForeignKey: 'ProductID' })
  Products: Product[];
}
