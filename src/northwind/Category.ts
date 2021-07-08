/*
    <Key>
        <PropertyRef Name="CategoryID" />
    </Key>
    <Property Name="CategoryID" Type="Edm.Int32" Nullable="false" />
    <Property Name="CategoryName" Type="Edm.String" />
    <Property Name="Description" Type="Edm.String" />
    <Property Name="Picture" Type="Edm.Binary" />
    <NavigationProperty Name="Products" Type="Collection(kendo_northwind_pg.Models.Product)" />
*/

import { Edm, IncKeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Product } from './Product';

@withEntitySetName('Categories')
@ODataModel({ name: 'Categories' })
export class Category {

  @IncKeyProperty()
  @Edm.Int32
  CategoryID: number;

  @Property()
  @Edm.String
  CategoryName: string;

  @Property()
  @Edm.String
  Description: string;

  @Property({ type: "blob" })
  @Edm.Binary
  Picture: number;

  @ODataNavigation({ type: 'OneToMany', entity: () => Product, targetForeignKey: 'CategoryID' })
  Products: Product[];
}
