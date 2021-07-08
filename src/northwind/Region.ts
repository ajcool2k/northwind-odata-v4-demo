/*
<EntityType Name="Region">
    <Key>
        <PropertyRef Name="RegionID" />
    </Key>
    <Property Name="RegionID" Type="Edm.Int32" Nullable="false" />
    <Property Name="RegionDescription" Type="Edm.String" />
    <NavigationProperty Name="Territories" Type="Collection(kendo_northwind_pg.Models.Territory)" />
</EntityType>
*/

import { Edm, KeyProperty, ODataModel, ODataNavigation, Property, withEntitySetName } from '@odata/server';
import { Territory } from './Territory';

@withEntitySetName('Regions')
@ODataModel({ name: 'Regions' })
export class Region {

    @KeyProperty()
    @Edm.Int32
    RegionID: number;

    @Property()
    @Edm.String
    RegionDescription: string;

    @ODataNavigation({ type: 'OneToMany', entity: () => Territory, targetForeignKey: 'TerritoryID' })
    Territories: Territory[];
}
