/*
      <EntityType Name="Product">
        <Key>
          <PropertyRef Name="ProductID" />
        </Key>
        <Property Name="ProductID" Type="Edm.Int32" Nullable="false" />
        <Property Name="ProductName" Type="Edm.String" />
        <Property Name="SupplierID" Type="Edm.Int32" />
        <Property Name="CategoryID" Type="Edm.Int32" />
        <Property Name="QuantityPerUnit" Type="Edm.String" />
        <Property Name="UnitPrice" Type="Edm.Decimal" />
        <Property Name="UnitsInStock" Type="Edm.Int16" />
        <Property Name="UnitsOnOrder" Type="Edm.Int16" />
        <Property Name="ReorderLevel" Type="Edm.Int16" />
        <Property Name="Discontinued" Type="Edm.Boolean" Nullable="false" />
        <Property Name="Order_Details" Type="Collection(kendo_northwind_pg.Models.Order_Detail)" />
        <NavigationProperty Name="Category" Type="kendo_northwind_pg.Models.Category">
          <ReferentialConstraint Property="CategoryID" ReferencedProperty="CategoryID" />
        </NavigationProperty>
        <NavigationProperty Name="Supplier" Type="kendo_northwind_pg.Models.Supplier">
          <ReferentialConstraint Property="SupplierID" ReferencedProperty="SupplierID" />
        </NavigationProperty>
      </EntityType>
*/

import { BigNumber, Edm, ForeignKey, IncKeyProperty, ODataModel, ODataNavigation, Property, Required, withEntitySetName } from '@odata/server';
import { Category } from './Category';
import { Order_Detail } from './OrderDetail';
import { Supplier } from './Supplier';

@withEntitySetName('Products')
@ODataModel({ name: 'Products' })
export class Product {

  @IncKeyProperty()
  ProductID: number;

  @Property()
  @Edm.String
  ProductName: string;

  @Property()
  @ForeignKey()
  SupplierID: number;

  @Property()
  @ForeignKey()
  CategoryID: number;

  @Property()
  @Edm.String
  QuantityPerUnit: string;

  @Property({ type: "numeric" })
  @Edm.Decimal
  UnitPrice: BigNumber;

  @Property()
  @Edm.Int16
  UnitsInStock: number;

  @Property()
  @Edm.Int16
  UnitsOnOrder: number;

  @Property()
  @Edm.Int16
  ReorderLevel: number;

  @Property()
  @Required
  @Edm.Boolean
  Discontinued: boolean;

  @Edm.Collection(Edm.ComplexType(Order_Detail))
  Order_Details: Order_Detail[];

  @ODataNavigation({ type: 'OneToOne', entity: () => Category, foreignKey: 'CategoryID', targetForeignKey: 'CategoryID' })
  Category: Category

  @ODataNavigation({ type: 'OneToOne', entity: () => Supplier, foreignKey: 'SupplierID', targetForeignKey: 'SupplierID' })
  Supplier: Supplier
}
